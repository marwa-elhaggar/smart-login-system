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
var users = JSON.parse(localStorage.getItem("users")) || [];

//^sign up logic
function createUser() {
  if (!checkEmpty()) {
    showError("All inputs are required !", "signUp");
    return;
  }

  var name = signName.value.trim();
  var email = signEmail.value.trim();
  var password = signPassword.value.trim();

  const namePattern = /^[A-Za-z\s]{2,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!namePattern.test(name)) {
    showError(
      "Name must be at least 2 letters and contain only letters.",
      "signUp"
    );
    return;
  }

  if (!emailPattern.test(email)) {
    showError("Invalid email format.", "signUp");
    return;
  }

  if (!passwordPattern.test(password)) {
    showError(
      "Password must be at least 6 characters and include letters and numbers.",
      "signUp"
    );
    return;
  }

  if (checkEmail()) {
    showError("Email already exists!", "signUp");
    return;
  }

  var user = { name, email, password };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  signUpError.classList.remove("text-danger");
  signUpError.classList.add("text-success");
  signUpError.innerHTML = "Success! You can now log in.";
}

// ^ show error message
function showError(message, errorPage) {
  if (errorPage === "signUp") {
    signUpError.classList.remove("text-success");
    signUpError.classList.add("text-danger");
    signUpError.innerHTML = message;
  } else {
    loginError.innerHTML = message;
  }
}

// * check if email exist while sign up
function checkEmail() {
  return users.some(
    (u) => u.email.toLowerCase() === signEmail.value.toLowerCase()
  );
}

//* check if all signup inputs aren't empty
function checkEmpty() {
  return (
    signName.value !== "" && signEmail.value !== "" && signPassword.value !== ""
  );
}

// ^ login logic
function login() {
  if (!checkEmptyLogin()) {
    showError("All inputs are required !", "login");
    return;
  }

  var email = loginEmail.value.trim();
  var password = loginPassword.value.trim();

  const user = checkUser(email, password);

  if (!user) {
    showError("Incorrect email or password", "login");
    return;
  }

  userName.innerHTML = `HELLO ${user.name.toUpperCase()}`;
  showHomePage();
}

//*check if user exist and password matches
function checkUser(email, password) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
    ) {
      return user;
    }
  }
  return false;
}

//* check empty login fields
function checkEmptyLogin() {
  return loginEmail.value !== "" && loginPassword.value !== "";
}

// ^ show login page
function showLoginPage() {
  loginForm.classList.remove("d-none");
  signUpForm.classList.add("d-none");
  homePage.classList.add("d-none");
  loginError.innerHTML = "";
}

// ^show signup page
function showSignUpPage() {
  loginForm.classList.add("d-none");
  signUpForm.classList.remove("d-none");
  homePage.classList.add("d-none");
  signUpError.innerHTML = "";
}

// ^show home page
function showHomePage() {
  loginForm.classList.add("d-none");
  signUpForm.classList.add("d-none");
  homePage.classList.remove("d-none");
}

// ^ events on buttons
loginButton.addEventListener("click", showLoginPage);
signUpButton.addEventListener("click", showSignUpPage);
homeButton.addEventListener("click", login);
userCreation.addEventListener("click", createUser);

logOutButton.addEventListener("click", function () {
  loginEmail.value = "";
  loginPassword.value = "";
  loginError.innerHTML = "";
  showLoginPage();
});
