// LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh
  
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    if (!email || !password) {
      alert("Please fill all login fields");
      return;
    }
  
    localStorage.setItem("careerSparkUser", JSON.stringify({
      name: email.split("@")[0],
      email: email
    }));
  
    window.location.href = "../pages/dashboard.html";

  });
  
  
  // REGISTER
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
  
    if (!name || !email || !password) {
      alert("Please fill all registration fields");
      return;
    }
  
    // save registered user (temporary)
    localStorage.setItem("careerSparkUser", JSON.stringify({
      name: name,
      email: email
    }));
  
    window.location.href = "../pages/dashboard.html";

  });
  