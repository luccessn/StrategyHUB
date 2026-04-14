import React, { useState } from "react";
import "./bt1.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { clearCart } from "../../Context/AppActionsCreator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { usStates, zipRegexByState } from "./usStates";
///MODAL
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Panel, PanelGroup } from "rsuite";
import CheckCard from "../../Components/CheckOut/CheckCard";
import { useAppContext } from "../../Context/AppContextProvider";

const CheckOuts = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const isValidCode = ["ms21", "ms22"].includes(promoCode.trim().toLowerCase());
  const { state, dispatch } = useAppContext();
  //MODAL
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isChecked, setIsChecked] = useState(false);
  //
  const [Data, setData] = useState({
    email: "",
    country: "",
    state: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    phone: "",
  });
  const [zipError, setZipError] = useState("");
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (name === "postalCode" && Data.country === "US") {
      const stateCode = Data.state;
      const regex = zipRegexByState[stateCode];
      if (regex && !regex.test(value)) {
        setZipError(`ZIP code does not match ${stateCode} format.`);
      } else {
        setZipError("");
      }
    }
  };
  const cartItems = state.cartItems;

  const nedliTotal = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.price.replace("$", "")) * item.quantity,
    0,
  );

  const totalAmount = isPromoApplied
    ? (nedliTotal * 0.001).toFixed(2)
    : nedliTotal.toFixed(2);
  function validateZip(zip, stateCode, country) {
    if (country !== "US") {
      return true; // სხვა ქვეყნების შემთხვევაში უბრალოდ ვატოვებთ ვალიდაციას
    }
    const regex = zipRegexByState[stateCode];
    return regex ? regex.test(zip) : false;
  }
  const isZipValid = validateZip(Data.postalCode, Data.state, Data.country);

  const isFormValid =
    Object.entries(Data).every(([key, value]) => {
      if (key === "apartment") return true; // apartment optional
      if (key === "state" && Data.country !== "US") return true; // არა US
      if (key === "postalCode" && Data.country === "US") return isZipValid; // US-ის შემთხვევაში ვალიდური zip აუცილებელია
      return value.trim() !== "";
    }) && isChecked;
  return (
    <div className="flex mt-10  flex-col items-center lg:items-start p-0 lg:p-4  xl:p-0 lg:flex-row  relative gap-14 lg:gap-24 top-24   xl:gap-40 justify-center text-white py-10">
      <PanelGroup
        accordion
        defaultActiveKey={null}
        className=" block lg:hidden"
      >
        <Panel
          header={
            <div className=" w-full cursor-target ml-5 sfm:ml-0 p-2 flex gap-10 justify-between items-center px-2">
              <span className="text-base font-semibold">Your Order</span>
              <span className="text-base font-semibold text-green-400">
                ${totalAmount}
              </span>
            </div>
          }
          eventKey={1}
          className="w-full   ssmm:w-[420px] ssm:w-[500px] sfm:w-[550px] smm:w-[600px] overflow-hidden "
        >
          <div className="flex flex-col  gap-8 rounded-xl shadow-xl p-8 bg-white/5 backdrop-blur-xl border-2 border-white/30 shadow-xl">
            <div
              className={`flex flex-col gap-5 overflow-y-auto ${
                state.cartItems.length > 3 ? "max-h-[300px]" : ""
              }`}
            >
              {state.cartItems.map((item) => (
                <CheckCard key={item.id} props={item} />
              ))}
            </div>
            {/* Promo Code */}
            <div className="flex flex-row gap-5">
              <input
                type="text"
                placeholder="Promo Code"
                className="w-full bg-[#1b1b1b] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (isValidCode) {
                    setIsPromoApplied(true);
                    alert("Promo Applied");
                  } else {
                    setIsPromoApplied(false);
                    alert("Invalid Promo Code");
                  }
                }}
                className={`px-5 py-2 rounded-lg font-semibold transition duration-300 ${
                  isValidCode
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                APPLY
              </button>
            </div>

            {/* Totals */}
            <div className="flex justify-between text-zinc-200">
              <h1 className="text-medium">Subtotal ·</h1>
              <h1 className="text-medium">
                {state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                items
              </h1>
            </div>
            <div className="flex justify-between text-white">
              <h1 className="text-medium">Total: </h1>
              <h1 className="text-medium">${totalAmount}</h1>
            </div>
          </div>
        </Panel>
      </PanelGroup>

      <form className="flex p-8 ssxx:p-2 ssmm:p-0 flex-col gap-4 rounded-lg w-[380px] ssm:w-[450px] sfm:w-[500px] smm:w-[600px] lg:w-[500px]">
        {/* Payment Info */}

        <div>
          <h2 className="text-2xl mb-4 text-zinc-300">Payment Information</h2>
          <div className="flex flex-col gap-4">
            <label htmlFor="text" className="text-sm text-gray-400">
              Cardholder Email
            </label>
            <input
              name="email"
              value={Data.email}
              onChange={ChangeInput}
              type="email"
              placeholder="example@email.com"
              className="w-full bg-[#1b1b1b] cursor-target p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
            />
          </div>
        </div>

        {/* Shipping Info */}
        <div>
          <h2 className="text-2xl mb-4 text-zinc-300">Shipping Address</h2>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-2">
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={Data.firstName}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="John"
                  className="w-full bg-[#1b1b1b] cursor-target p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              </div>
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={Data.lastName}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-[#1b1b1b] cursor-target p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              </div>
            </div>
            <div>
              <label htmlFor="country" className="text-sm text-gray-400">
                Country/Region
              </label>
              <select
                name="country"
                value={Data.country}
                onChange={ChangeInput}
                className="w-full  bg-[#1b1b1b] cursor-target text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="GE">Georgia</option>
                <option value="CA">Canada</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="GB">United Kingdom</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="JP">Japan</option>
                <option value="CN">China</option>
                <option value="AU">Australia</option>
                <option value="BR">Brazil</option>
                <option value="IN">India</option>
                <option value="RU">Russia</option>
                {/* დამატებით რაც გინდა შეგიძლია დაამატო */}
              </select>
            </div>
            <div>
              <label htmlFor="state" className="text-sm text-gray-400">
                State
              </label>

              {Data.country === "US" ? (
                <select
                  name="state"
                  value={Data.state}
                  onChange={ChangeInput}
                  className="w-full bg-[#1b1b1b] cursor-target p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                >
                  <option value="">Select a state</option>
                  {usStates.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name="state"
                  value={Data.state}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="State / Region"
                  disabled={Data.country === "US" ? false : false} // თუ არ გინდა ჩაკეტო, დააყენე false
                  className="w-full bg-[#1b1b1b] cursor-target p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              )}
            </div>

            <div>
              <label htmlFor="text" className="text-sm text-gray-400">
                Address
              </label>
              <input
                name="address"
                value={Data.address}
                onChange={ChangeInput}
                type="text"
                placeholder="Street address, building"
                className="w-full bg-[#1b1b1b] p-3 cursor-target rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
              />
            </div>
            <div>
              <label htmlFor="text" className="text-sm text-gray-400">
                Apartment
              </label>
              <input
                name="apartment"
                value={Data.apartment}
                onChange={ChangeInput}
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full bg-[#1b1b1b] p-3 cursor-target rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
              />
            </div>
            <div className="flex flex-row gap-2">
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  Postal Code
                </label>
                <input
                  name="postalCode"
                  value={Data.postalCode}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="Postal Code"
                  className={`w-full bg-[#1b1b1b] p-3 cursor-target rounded-lg focus:outline-none focus:ring-2 ${
                    zipError ? "ring-red-500" : "focus:ring-purple-950"
                  }`}
                />
                {zipError && (
                  <p className="text-red-500 text-xs mt-1">{zipError}</p>
                )}
              </div>
              <div>
                <label htmlFor="text" className="text-sm text-gray-400">
                  City
                </label>
                <input
                  name="city"
                  value={Data.city}
                  onChange={ChangeInput}
                  type="text"
                  placeholder="City"
                  className="w-full bg-[#1b1b1b] p-3 cursor-target rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone Number</label>
              <PhoneInput
                name="phone"
                country={"us"} // საწყისი ქვეყანა (შეგიძლია 'ge' - საქართველოსთვის)
                value={Data.phone}
                onChange={(phone) => setData((prev) => ({ ...prev, phone }))}
                inputStyle={{
                  width: "100%",
                  height: "44px",
                  backgroundColor: "#1b1b1b",
                  color: "#fff",
                  fontSize: "16px",
                  paddingLeft: "48px", // დროშის ადგილი
                  borderRadius: "8px",
                  border: "none",
                }}
                buttonStyle={{
                  backgroundColor: "#1b1b1b",
                  border: "none",
                }}
                containerStyle={{
                  width: "100%",
                }}
              />
            </div>

            <div className="cntr flex flex-row gap-5">
              <input
                type="checkbox"
                id="cbx"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="cbx" className="cbx"></label>
              <div className="flex flex-row gap-2 font-mono text-medium">
                <p className="">Aggree Our</p>
                <p
                  onClick={onOpen}
                  className=" relative text-blue-500 underline cursor-pointer"
                >
                  Terminates
                </p>
              </div>
            </div>

            {/* Modal */}
            {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>Our Terms and Conditions</ModalHeader>
                    <ModalBody>
                      <p>
                        Please be informed that all information you provide is
                        stored in our database to prevent any unforeseen issues.
                        Accordingly, this information will be deleted once you
                        receive your order/package. <br></br> <br></br> Please
                        note that sold products are non-returnable and
                        non-exchangeable. We are responsible for our quality
                        standards. If any unexpected issues arise, we will work
                        through this matter with our team alongside you.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        Accept
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal> */}
          </div>
        </div>

        {/* PayPal Button */}
        <div className="mt-10">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AS0WyKpIU1JlLlYRXvrWRadDpWdhHvS3DDvA3TNRoKyU2-ckkUpH-0BAzYKLzaAucdQUvCv2bm3if88Z",
              currency: "USD",
            }}
          >
            <PayPalButtons
              disabled={!isFormValid}
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "paypal",
              }}
              forceReRender={[totalAmount]}
              createOrder={async () => {
                const response = await fetch(
                  "https://strategyhub.onrender.com/server/api/paypal/create-paypal-order",
                  // "http://localhost:5000/server/api/paypal/create-paypal-order",
                  // "https://musiccrafters.onrender.com/server/api/paypal/create-paypal-order",

                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cartItems, totalAmount }),
                  },
                );

                const data = await response.json();
                if (!response.ok)
                  throw new Error(data.error || "Order creation failed");

                return data.id; // ეს არის orderId
              }}
              onApprove={async (data) => {
                const userData = {
                  email: Data.email,
                  name: `${Data.firstName} ${Data.lastName}`,
                  country: Data.country,
                  state: Data.state,
                  city: Data.city,
                  address1: Data.address,
                  address2: Data.apartment,
                  postalCode: Data.postalCode,
                  phone: Data.phone,
                };
                const response = await fetch(
                  "https://strategyhub.onrender.com/server/api/paypal/confirm",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userData,
                      cartItems,
                      orderId: data.orderID,
                    }),
                  },
                );

                const result = await response.json();

                if (!response.ok) {
                  alert(result.error);
                  return;
                }

                window.location.href = "/success";
              }}
              onCancel={() => {
                window.location.href = "/cancel";
              }}
              onError={(err) => {
                // console.error("PayPal Error:", err);
                alert("Payment error occurred");
              }}
            />
          </PayPalScriptProvider>
        </div>
      </form>

      {/* Right Panel: Cart Summary */}
      <div className="hidden  lg:flex flex-col w-[500px] gap-8 rounded-2xl shadow-xl p-8">
        <div
          className={`flex flex-col gap-5 overflow-y-auto ${
            state.cartItems.length > 3 ? "max-h-[300px]" : ""
          }`}
        >
          {state.cartItems.map((item) => (
            <CheckCard key={item.id} props={item} />
          ))}
        </div>

        {/* Promo Code */}
        <div className="flex flex-row gap-5">
          <input
            type="text"
            placeholder="Promo Code"
            className="w-full bg-[#1b1b1b] cursor-target p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (isValidCode) {
                setIsPromoApplied(true);
                alert("Promo Applied");
              } else {
                setIsPromoApplied(false);
                alert("Invalid Promo Code");
              }
            }}
            className={`px-5 py-2 cursor-target rounded-lg font-semibold transition duration-300 ${
              isValidCode
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            APPLY
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-between text-zinc-200">
          <h1 className="text-medium">Subtotal ·</h1>
          <h1 className="text-medium">
            {state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
            items
          </h1>
        </div>
        <div className="flex justify-between text-white">
          <h1 className="text-medium">Total: </h1>
          <h1 className="text-medium">${totalAmount}</h1>
        </div>
      </div>
    </div>
  );
};

export default CheckOuts;
