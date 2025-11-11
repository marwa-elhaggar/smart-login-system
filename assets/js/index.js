//^ get login html
var loginEmail = document.querySelector(".email");
var loginPassword = document.querySelector(".password");
var loginError = document.querySelector(".login-error");
var signUpError = document.querySelector(".sign-up-error");
var loginButton = document.querySelector(".login-btn");
var loginForm = document.querySelector(".login");
var homeButton = document.querySelector(".home-btn");

//^get signup html
var signName = document.querySelector(".sign-name");
var signEmail = document.querySelector(".sign-email");
var signPassword = document.querySelector(".sign-password");
var signUpForm = document.querySelector(".sign-up");
var signUpButton = document.querySelector(".sign-up-btn");
var userCreation = document.querySelector(".sign-up-submit");

//^ get home html
var homePage = document.querySelector(".home");
var logOutButton = document.querySelector(".log-out");
var userName = document.querySelector(".user-name");

// ^store array in local storage
if (JSON.parse(localStorage.getItem("users"))) {
  var users = JSON.parse(localStorage.getItem("users"));
} else {
  var users = [];
}

//^sign up logic

function createUser() {
  if (checkEmpty() === false) {
    console.log("all are required");
    showError("All inputs are required !" ,"signUp");
    return false;
  }

  validateInputs();

  if (checkEmail()) {
    console.log("existed email");
    error("existed email", "signUp");
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    signUpError.classList.remove("text-danger");
    signUpError.classList.add("text-success");
    signUpError.innerHTML = "Success";
  }
}

// ^ show error message
function showError(message, errorPage) {
  if (errorPage === "signUp") {
    signUpError.classList.remove("text-success");
    signUpError.classList.add("text-danger");
    signUpError.innerHTML = `${message}`;
  } else if (errorPage === "login") {
    loginError.innerHTML = `${message}`;
  }
}

// ^validate with regex
function validateInputs() {
  var name = signName.value;
  var email = signEmail.value;
  var password = signPassword.value;

  const namePattern = /^[A-Za-z\s]{2,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!namePattern.test(name)) {
    showError("Name must be at least 2 letters and contain only letters.");
    return;
  }

  if (!emailPattern.test(email)) {
    showError("Invalid email format.");
    return;
  }

  if (!passwordPattern.test(password)) {
    showError(
      "Password must be at least 6 characters and include letters and numbers."
    );
    return;
  }
  var user = {
    name: signName.value,
    email: signEmail.value,
    password: signPassword.value,
  };
}

// * check if email exist while sign up

function checkEmail() {
  if (users.length === 0) {
    console.log("empty array");
    return false;
  }
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === signEmail.value.toLowerCase()) {
      return true;
    }
  }
}

//* check if all inputs aren't empty

function checkEmpty() {
  if (
    signName.value === "" ||
    signEmail.value === "" ||
    signPassword.value === ""
  ) {
    return false;
  } else {
    return true;
  }
}

// ^ login logic

function login() {
  if (checkEmptyLogin() === false) {
    console.log("all are required");
    showError("All inputs are required !", "login");
    return;
  }

  var password = loginPassword.value;
  var email = loginEmail.value;

  if (checkUser(password, email) === false) {
    console.log("incorrect email or password ");
    showError("*incorrect email or password ", "login");
  } else {
    var user;
    for (var i = 0; i < users.length; i++) {
      if (users[i].email.toLowerCase() === email.toLowerCase()) {
        user = users[i].name;
        break;
      }
    }
    userName.innerHTML = `HELLO ${user.toUpperCase()}`;
    showHomePage();
  }
}

//*check if user exist or not
function checkUser(pass, email) {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].password.toLowerCase() === pass.toLowerCase() &&
      users[i].email.toLowerCase() === email.toLowerCase()
    ) {
      return true;
    }
  }

  return false;
}

//* chick if input fields in login empty or not
function checkEmptyLogin() {
  if (loginEmail.value === "" || loginPassword.value === "") {
    return false;
  } else {
    return true;
  }
}

// ^ show login page
function showLoginPage() {
  loginForm.classList.remove("d-none");
  signUpForm.classList.add("d-none");
  homePage.classList.add("d-none");
}

// ^show signup page
function showSignUpPage() {
  loginForm.classList.add("d-none");
  signUpForm.classList.remove("d-none");
  homePage.classList.add("d-none");
}

// ^show home page
function showHomePage() {
  loginForm.classList.add("d-none");
  signUpForm.classList.add("d-none");
  homePage.classList.remove("d-none");
}

// ^ events on buttons

loginButton.addEventListener("click", showLoginPage);
loginButton.addEventListener("click", showLoginPage);
signUpButton.addEventListener("click", showSignUpPage);
homeButton.addEventListener("click", login);
userCreation.addEventListener("click", createUser);
logOutButton.addEventListener("click", showLoginPage);
logOutButton.addEventListener("click", function () {
  loginEmail.value = "";
  loginPassword.value = "";
  showError("", "login");
});
