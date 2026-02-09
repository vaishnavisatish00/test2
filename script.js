$(document).ready(function() {
    // --- jQuery Operations ---
    // Change button text using jQuery
    $("#submitBtn").text("Create Account");

    // Set background-image using jQuery CSS property
    $("body").css({
        "background-image": "url('https://www.transparenttextures.com/patterns/cubes.png')",
        "background-color": "#f4f7f6"
    });

    // Handle Form via jQuery
    $("#regForm").on("submit", function(e) {
        e.preventDefault();
        
        // Access HTML form data using jQuery
        let username = $("#username").val().trim();
        let email = $("#email").val().trim();
        let phone = $("#phone").val().trim();
        let pass = $("#password").val();
        let confirmPass = $("#confirmPassword").val();
        let msgArea = document.getElementById("message-area");

        // --- VALIDATIONS ---
        
        // 1. Empty Check
        if(username === "" || email === "" || phone === "" || pass === "") {
            alert("All fields are required and cannot be just spaces.");
            return;
        }

        // 2. Phone Validation (Numeric, 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if(!phoneRegex.test(phone)) {
            alert("Phone must be exactly 10 numeric digits.");
            return;
        }

        // 3. Email Validation (Regex as requested)
        // few letters before @, 3 letters between @ and ., 2-3 letters after .
        const emailRegex = /^[a-zA-Z]+@[a-zA-Z]{3}\.[a-zA-Z]{2,3}$/;
        if(!emailRegex.test(email)) {
            alert("Email format invalid! Must be: letters@3letters.2or3letters");
            return;
        }

        // 4. Password Validation
        // At least 7 chars, 1 capital, 1 digit, 1 special (&, $, #, @)
        const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[&@$#])[A-Za-z\d&@$#]{7,}$/;
        if(!passRegex.test(pass)) {
            alert("Password must be 7+ chars, include 1 Uppercase, 1 Digit, and 1 Special Character (&, $, #, @)");
            return;
        }

        // 5. Match Password
        if(pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        alert("Validation Successful!");
        // Add attribute using jQuery
        $(this).attr("data-status", "validated");
    });

    // --- Pure JS & DOM Manipulation ---
    
    // Change image source after clicking a button
    document.getElementById("change-img-btn").onclick = function() {
        document.getElementById("profile-img").src = "https://via.placeholder.com/100/000000/FFFFFF/?text=User";
    };

    // DOM Manipulation Demo Button
    document.getElementById("dom-demo-btn").addEventListener("click", function() {
        // 1. getElementsByClassName & change CSS
        let inputs = document.getElementsByClassName("user-input");
        for(let i=0; i<inputs.length; i++) {
            inputs[i].style.color = "blue";
        }

        // 2. getElementsByTagName & change innerHTML
        document.getElementsByTagName("h2")[0].innerHTML = "System Updated!";

        // 3. Create/Add a text node
        let newPara = document.createElement("p");
        let textNode = document.createTextNode("Student Record: Ready for submission.");
        newPara.appendChild(textNode);
        document.getElementById("message-area").appendChild(newPara);

        // 4. Delete a node (Delete the demo button after use)
        this.remove();
    });
});