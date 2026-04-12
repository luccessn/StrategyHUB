export const usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export const zipRegexByState = {
  AL: /^(35[0-9]{3}|36[0-9]{3})$/, // Alabama 35000–36999
  AK: /^(99[5-9][0-9]{2})$/, // Alaska 99500–99999
  AZ: /^8[5-6][0-9]{3}$/, // Arizona 85000–86999
  AR: /^7(1[6-9]|2[0-9]|3[0-9]|4[0-9])\d{2}$/, // Arkansas 71600–72999
  CA: /^9[0-6]\d{3}$/, // California 90000–96199
  CO: /^8(0[0-9]|1[0-9]|2[0-9]|3[0-9])\d{2}$/, // Colorado 80000–83999
  CT: /^06[0-9]{3}$/, // Connecticut 06000–06999
  DE: /^19[7-9]\d{2}$/, // Delaware 19700–19999
  FL: /^3(2[0-9]|3[0-9]|4[0-9])\d{2}$/, // Florida 32000–34999
  GA: /^3(0[0-9]|1[0-9]|2[0-9]|3[0-9]|9[0-9])\d{2}$/, // Georgia 30000–31999, 39800–39999
  HI: /^96[7-8]\d{2}$/, // Hawaii 96700–96899
  ID: /^83[2-9]\d{2}$/, // Idaho 83200–83999
  IL: /^6(0[0-9]|1[0-9]|2[0-9])\d{2}$/, // Illinois 60000–62999
  IN: /^46[0-9]{3}|47[0-9]{3}$/, // Indiana 46000–47999
  IA: /^5(0[0-9]|1[0-9]|2[0-9])\d{2}$/, // Iowa 50000–52999
  KS: /^66[0-9]{3}|67[0-9]{3}$/, // Kansas 66000–67999
  KY: /^4(0[0-9]|1[0-9]|2[0-9])\d{2}$/, // Kentucky 40000–42999
  LA: /^7(0[0-9]|1[0-9])\d{2}$/, // Louisiana 70000–71999
  ME: /^0[3-4][0-9]{3}$/, // Maine 03000–04999
  MD: /^2(0[0-9]|1[0-9]|2[0-9])\d{2}$/, // Maryland 20000–21999
  MA: /^0(1[0-9]|2[0-9])\d{2}$/, // Massachusetts 01000–02799
  MI: /^48[0-9]{3}|49[0-9]{3}$/, // Michigan 48000–49999
  MN: /^5(5[0-9]|6[0-9])\d{2}$/, // Minnesota 55000–56999
  MS: /^38[6-9]\d{2}|39[0-2]\d{2}$/, // Mississippi 38600–39799
  MO: /^6(3[0-9]|4[0-9]|5[0-9])\d{2}$/, // Missouri 63000–65999
  MT: /^59[0-9]{3}$/, // Montana 59000–59999
  NE: /^68[0-9]{3}|69[0-9]{3}$/, // Nebraska 68000–69999
  NV: /^89[0-9]{3}$/, // Nevada 89000–89999
  NH: /^03[0-9]{3}$/, // New Hampshire 03000–03899
  NJ: /^07[0-9]{3}|08[0-9]{3}$/, // New Jersey 07000–08999
  NM: /^87[0-9]{3}|88[0-9]{3}$/, // New Mexico 87000–88999
  NY: /^1(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9])\d{2}$/, // New York 10000–14999
  NC: /^2(7[0-9]|8[0-9]|9[0-9])\d{2}$/, // North Carolina 27000–28999
  ND: /^58[0-9]{3}$/, // North Dakota 58000–58999
  OH: /^4(3[0-9]|4[0-9]|5[0-9])\d{2}$/, // Ohio 43000–45999
  OK: /^73[0-9]{3}|74[0-9]{3}$/, // Oklahoma 73000–74999
  OR: /^97[0-9]{3}$/, // Oregon 97000–97999
  PA: /^1(5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{2}$/, // Pennsylvania 15000–19999
  RI: /^02[8-9]\d{2}$/, // Rhode Island 02800–02999
  SC: /^29[0-9]{3}$/, // South Carolina 29000–29999
  SD: /^57[0-9]{3}$/, // South Dakota 57000–57999
  TN: /^37[0-9]{3}|38[0-5]\d{2}$/, // Tennessee 37000–38599
  TX: /^7(5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{2}$/, // Texas 75000–79999
  UT: /^84[0-9]{3}$/, // Utah 84000–84999
  VT: /^05[0-9]{3}$/, // Vermont 05000–05999
  VA: /^2(0[0-9]|1[0-9]|2[0-9]|3[0-9])\d{2}$/, // Virginia 20000–24999
  WA: /^98[0-9]{3}|99[0-4]\d{2}$/, // Washington 98000–99499
  WV: /^24[7-9]\d{2}|25[0-9]{3}|26[0-9]{3}$/, // West Virginia 24700–26999
  WI: /^53[0-9]{3}|54[0-9]{3}$/, // Wisconsin 53000–54999
  WY: /^82[0-9]{3}$/, // Wyoming 82000–82999
};
