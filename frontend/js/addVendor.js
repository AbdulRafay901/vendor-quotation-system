const form = document.getElementById("vendorForm");
const vendorName = document.querySelector("#vendorName");
const companyName = document.querySelector("#companyName");
const Amount = document.querySelector("#Amount");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const status = document.querySelector("#status");

form.addEventListener("submit", saveVendor);

async function saveVendor(e) {
  e.preventDefault();

  const payload = {
    vendor_name: vendorName.value.trim(),
    company_name: companyName.value.trim(),
    email: email.value.trim(),
    amount: Amount.value.trim(),
    phone: phone.value.trim(),
    address: address.value.trim(),
    status: status.value === "true" || status.value === "1" || status.checked,
  };

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/auth/vendors",
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Success Response:", data);

    const form = (document.getElementById("vendorForm").value = "");
    const vendorName = (document.querySelector("#vendorName").value = "");
    const companyName = (document.querySelector("#companyName").value = "");
    const email = (document.querySelector("#email").value = "");
    const phone = (document.querySelector("#phone").value = "");
    const address = (document.querySelector("#address").value = "");
    const status = (document.querySelector("#status").value = "");
  } catch (error) {
    console.error(
      "Error Response:",
      error.response ? error.response.data : error.message,
    );
    if (error.response && error.response.data.errors) {
      console.log(
        "Validation Error: " + JSON.stringify(error.response.data.errors),
      );
    } else {
      console.log("Something went wrong!");
    }
  }
}
