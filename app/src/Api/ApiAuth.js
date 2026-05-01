export async function authHandler(action, user) {
  const response = await fetch(
    `https://strategyhub.onrender.com/server/${action}`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    },
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Error ");
  }
  return result;
}

// http://localhost:5000/server
// https://strategyhub.onrender.com/
