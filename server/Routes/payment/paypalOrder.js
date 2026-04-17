import express from "express";
const router = express.Router();

import paypal from "@paypal/checkout-server-sdk";
import { Order } from "../../Models/Order.js";
import buildOrderEmail from "../../Utils/sendEmail/buildOrderEmail.js";
import sendEmail from "../../Utils/sendEmail/sendEmail.js";
import {
  createPrintfulOrder,
  buildPrintfulOrderData,
} from "../../Utils/printful.js";

const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET,
  ),
);

//
router.post("/create-paypal-order", async (req, res) => {
  const { cartItems, totalAmount: clientTotal } = req.body;

  const totalAmount = clientTotal
    ? parseFloat(clientTotal).toFixed(2)
    : cartItems
        .reduce(
          (acc, item) =>
            acc + parseFloat(item.price.replace("$", "")) * item.quantity,
          0,
        )
        .toFixed(2);

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalAmount,
        },
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error("PayPal Error:", err);
    res.status(500).json({ error: err.message });
  }
});

//
//
router.post("/confirm", async (req, res) => {
  const { userData, cartItems, orderId } = req.body;

  try {
    const existing = await Order.findOne({ paypalOrderId: orderId });
    if (existing) {
      return res.status(400).json({ error: "Order already processed" });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await paypalClient.execute(request);

    if (capture.result.status !== "COMPLETED") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    console.log(" Payment captured:", capture.result.id);

    const orderData = buildPrintfulOrderData(userData, cartItems);
    const printfulResponse = await createPrintfulOrder(orderData);

    const totalAmount = cartItems
      .reduce(
        (acc, item) =>
          acc + parseFloat(item.price.replace("$", "")) * item.quantity,
        0,
      )
      .toFixed(2);

    try {
      const orderDetails = cartItems
        .map((item) => `${item.name} (x${item.quantity})`)
        .join("<br/>");

      const message = `
        Thank you for your order!<br/><br/>
        ${orderDetails}<br/><br/>
        Total: $${totalAmount}
      `;

      // const html = buildOrderEmail(userData.name, message);

      // await sendEmail({
      //   to: userData.email,
      //   subject: "Order Confirmation",
      //   html,
      // });
    } catch (emailErr) {
      console.log("⚠️ Email failed but order is OK");
    }

    const newOrder = new Order({
      user: userData,
      items: cartItems,
      total: totalAmount,
      paypalOrderId: orderId,
      paypalCaptureId: capture.result.id,
      status: "paid",
    });

    await newOrder.save();

    res.status(200).json({
      message: "Order completed successfully",
      captureId: capture.result.id,
    });
  } catch (error) {
    console.error("❌ Error in /confirm:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
