document.addEventListener("submit", async function (e) {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  e.preventDefault();

  const payload = {
    email: email.value.trim(),
    password: password.value.trim(),
  };

  if (!payload.email || !payload.password) {
    return alert("All fields are required.");
  }

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/auth/login",
      payload,
    );

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "/frontend/pages/dashboard.html";
  } catch (error) {
    console.log(error.response.data);
  }
});
