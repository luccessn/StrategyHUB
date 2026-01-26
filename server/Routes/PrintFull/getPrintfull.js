const express = require("express");
const router = express.Router();
const merch = require("../../Models/merch");
const printfulAPI = require("../../Utils/printful");

router.get("/sync", async (req, res) => {
  try {
    const productsResponse = await printfulAPI.get("/store/products");
    const products = productsResponse.data.result;

    for (const product of products) {
      const productId = product.id;
      const productDetailsResponse = await printfulAPI.get(
        `/store/products/${productId}`,
      );
      const productDetails = productDetailsResponse.data.result;

      const name = productDetails.sync_product?.name || "უცნობი სახელი";
      const variants = productDetails.sync_variants || [];
      const files = productDetails.sync_product?.files || [];
      const price =
        productDetails.sync_product?.retail_price ||
        Math.min(
          ...variants.map((v) => parseFloat(v.retail_price) || Infinity),
        );

      const minPrice =
        variants.length > 0
          ? Math.min(
              ...variants.map((v) => parseFloat(v.retail_price) || Infinity),
            )
          : null;

      const maxPrice =
        variants.length > 0
          ? Math.max(
              ...variants.map((v) => parseFloat(v.retail_price) || -Infinity),
            )
          : null;

      const existingDesign = await merch.findOne({
        printfulProductId: productId.toString(),
      });

      let images = existingDesign?.images || {
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        img6: "",
      };

      const preparedVariants = await Promise.all(
        variants.map(async (variant) => {
          const variantName = variant.name || "";
          const size = variant.size || "უცნობია";
          const color = variant.color || "უცნობია";
          const retail_price = parseFloat(variant.retail_price || 0);

          // დავაგენერიროთ დამატებითი ინფო detail call-ით
          let color_code = "N/A";
          try {
            const productDetail = await printfulAPI.get(
              `/products/${variant.product.product_id}`,
            );
            const detailedVariant = productDetail.data.result.variants.find(
              (v) => v.id === variant.variant_id,
            );
            color_code = detailedVariant?.color_code || "N/A";
          } catch (e) {
            console.warn(
              `Error fetching color_code for variant ${variant.variant_id}: ${e.message}`,
            );
          }

          return {
            variant_id: variant.variant_id,
            sync_variant_id: variant.id, // <=== აქ არის მთავარი ცვლილება
            size,
            color,
            color_code,
            retail_price,
            preview_url: variant.files?.[0]?.preview_url || "",
            files: variant.files || [],
          };
        }),
      );
      await merch.findOneAndUpdate(
        { printfulProductId: productId.toString() },
        {
          name,
          printfulProductId: productId.toString(),
          images,
          // preview,
          // type: "tshirt",
          variants: preparedVariants,
          price,
          minPrice,
          maxPrice,
          stock: existingDesign ? existingDesign.stock : 100,
        },
        { upsert: true, new: true },
      );
    }

    res.json({ message: "Printful Designs synchronized successfully." });
  } catch (err) {
    console.error("შეცდომა:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});
// get now
router.get("/get", async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const Merch = await merch.findOne({ printfulProductId: id });
      if (!Merch) {
        return res
          .status(400)
          .json({ error: "oops something wront in printfulGet Funtional" });
      }
      return res.json(Merch);
    } else {
      const allMerchs = await merch.find();
      return res.json(allMerchs);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
