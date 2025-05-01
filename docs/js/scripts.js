
document.getElementById("login-button").onclick = function(event) {
        console.log("Login button clicked");
        event.preventDefault();
        
        window.location.replace("dashboard/dashboard.html");
};

