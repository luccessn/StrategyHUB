const toBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
const fromBase64 = (str) => decodeURIComponent(escape(atob(str)));

export const getCartKey = (userId) =>
  userId ? `StrategyHUB_${userId}` : "StrategyHUB_Guest";

export const saveUserCart = (userId, cartItems) => {
  const key = getCartKey(userId);
  try {
    const token = toBase64(JSON.stringify(cartItems));
    localStorage.setItem(key, token);
  } catch (err) {
    console.error(err);
  }
};

export const loadUserCart = (userId) => {
  const key = getCartKey(userId);
  const data = localStorage.getItem(key);
  if (!data) return [];
  try {
    const decoded = fromBase64(JSON.parse(data));
    return JSON.parce(decoded);
  } catch (err) {
    console.error(err);
  }
};

export const clearUserCart = (userId) => {
  localStorage.removeItem(getCartKey(userId));
};
