document
    .querySelector(".addVendorBtn")
    .addEventListener("click", () => {
        window.location.href =
            "addVendor.html";
    });



    const form = document.getElementById("vendorForm");

form.addEventListener("submit", saveVendor);

function saveVendor(e) {
    e.preventDefault();

    clearErrors();

    const payload = {
        vendorName: vendorName.value.trim(),
        companyName: companyName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        address: address.value.trim(),
        status: status.value,
    };

    let hasError = false;

    Object.entries(payload).forEach(([key, value]) => {
        if (!value) {
            showError(key, "This field is required.");
            hasError = true;
        }
    });

    if (hasError) return;

    console.log(payload);

    // axios.post(...)
}
