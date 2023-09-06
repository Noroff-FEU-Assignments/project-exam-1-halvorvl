const form = document.querySelector("#contactform");
const fullName = document.querySelector("#name");
const fullNameError = document.querySelector("#fullNameError");
const phone = document.querySelector("#phone");
const phoneError = document.querySelector("#phoneError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

function validateForm(event) {
  event.preventDefault();

  if (checkLen(fullName.value, 0) === true) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (validatePhone(phone.value) === true) {
    phoneError.style.display = "none";
  } else {
    phoneError.style.display = "block";
  }

  if (
    (checkLen(fullName.value, 0) === true) &
    (validateEmail(email.value) === true) &
    (validatePhone(phone.value) === true)
  ) {
    open("contact_confirmation.html", "_self");
  }
}

form.addEventListener("submit", validateForm);

function checkLen(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const checkPattern = regEx.test(email);
  return checkPattern;
}

validateEmail();

function validatePhone(phone) {
  const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  const checkPhone = regex.test(phone);

  return checkPhone;
}

validatePhone();
