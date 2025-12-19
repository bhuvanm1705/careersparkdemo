document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("careerSparkUser"));

    const loginBtn = document.getElementById("nav-login");
    const dashBtn = document.getElementById("nav-dashboard");
    const logoutBtn = document.getElementById("nav-logout");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (dashBtn) dashBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (dashBtn) dashBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("careerSparkUser");
            window.location.href = "index.html";
        });
    }
});
