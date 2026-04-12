import axios from "axios";
export const printfulAPI = axios.create({
  baseURL: "https://api.printful.com/",
  headers: {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
  },
});
// module.exports = printfulAPI;
export const createPrintfulOrder = async (orderData) => {
  try {
    const response = await printfulAPI.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error(
      "Printful Order Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const buildPrintfulOrderData = (userData, items) => {
  return {
    recipient: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address1: userData.address1,
      address2: userData.address2 || "",
      city: userData.city,
      state_code: userData.state || null,
      country_code: userData.country,
      zip: userData.postalCode,
    },
    items: items.map((item) => ({
      sync_variant_id: item.sync_variant_id, // yep
      quantity: item.quantity,
    })),
  };
};
