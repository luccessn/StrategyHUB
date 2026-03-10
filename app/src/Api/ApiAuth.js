export async function authHandler(action, user) {
  const response = await fetch(`http://localhost:5000/server/${action}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  if (!response.ok) {
    return result;
  }
  throw new Error(result.message || "Error ");
}
