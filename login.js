document.addEventListener("DOMContentLoaded", function () {
    // Select login buttons
    const companyLoginBtn = document.querySelector(".company");
    const developerLoginBtn = document.querySelector(".developer");

    // Event listener for Company login button
    companyLoginBtn.addEventListener("click", function () {
        window.location.href = "company-dashboard.html"; // Redirect to company dashboard or login page
    });

    // Event listener for Developer login button
    developerLoginBtn.addEventListener("click", function () {
        window.location.href = "user-dashboard.html"; // Redirect to user dashboard or login page
    });

    // Form validation function (if login form is added later)
    function validateForm(event) {
        event.preventDefault();
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");

        if (email.value.trim() === "" || password.value.trim() === "") {
            alert("Please fill in all fields.");
            return false;
        }
        return true;
    }
});
