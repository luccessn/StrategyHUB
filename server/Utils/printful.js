const axios = require("axios");

const printfulAPI = axios.create({
  baseURL: "https://api.printful.com/",
  headers: {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
  },
});

module.exports = printfulAPI;
