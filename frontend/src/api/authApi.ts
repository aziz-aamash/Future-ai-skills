const API_URL = "http://localhost:5000/api/admin";

export async function loginAdmin(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include", // IMPORTANT: sends/receives cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function logoutAdmin() {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
export async function getCurrentAdmin() {
  const res = await fetch("http://localhost:5000/api/admin/me", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not logged in");
  }

  return res.json();
}