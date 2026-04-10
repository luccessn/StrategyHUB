const toBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
const fromBase64 = (str) => decodeURIComponent(escape(atob(str)));

export const getCartKey = (userId) =>
  userId ? `StrategyHUB_${userId}` : "StrategyHUB_Guest";

export const saveUserCart = (userId, data) => {
  const key = getCartKey(userId);
  try {
    const token = toBase64(JSON.stringify(data));
    localStorage.setItem(key, token);
  } catch (err) {
    console.error(err);
  }
};
export const loadUserCart = (userId) => {
  const key = getCartKey(userId);
  const data = localStorage.getItem(key);
  if (!data) {
    return {
      cartItems: [],
      subscription: {
        free: {
          freeAccess: false,
          freeAccessExpiresAt: null,
        },
      },
      token: null,
    };
  }
  try {
    const decoded = fromBase64(data);
    const parsed = JSON.parse(decoded);
    return {
      cartItems: parsed.cartItems || [],
      subscription: parsed.subscription || {
        free: { freeAccess: false, freeAccessExpiresAt: null },
      },
    };
  } catch (err) {
    console.error(err);
    return {
      cartItems: [],
      subscription: {
        free: {
          freeAccess: false,
          freeAccessExpiresAt: null,
        },
      },
    };
  }
};
export const clearUserCart = (userId) => {
  localStorage.removeItem(getCartKey(userId));
};
