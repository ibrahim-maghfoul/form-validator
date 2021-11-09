const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

/* functions */
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  let value =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value.test(input.value.trim())) {
    showSuccess(input);
  } else showError(input, "Email is not valid!");
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getValueinUppercase(input)} field is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length <= min) {
    showError(
      input,
      `${getValueinUppercase(input)} must be more than ${min} caracters!`
    );
  } else if (input.value.length >= max) {
    showError(
      input,
      `${getValueinUppercase(input)} must be less than ${min} caracters!`
    );
  } else showSuccess(input);
}

function checkPasswordMatch(input1, input2) {
  if (input.value == "") {
    showError(input, `${getValueinUppercase(input)} Shouldn't be empty!`);
  } else {
    if (input1.value === input2.value) {
      showSuccess(input1);
      showSuccess(input2);
    } else showError(input2, "Make Sure you entred the same password!");
  }
}

function getValueinUppercase(input) {
  let str = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  if (str === "Password2") return "Password";
  return str;
}

/* Events */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 4, 20);
  checkLength(password, 6, 30);
  checkEmail(email);
  checkPasswordMatch(password, password2);

  /* you can validate it with this approach but it's not scalable and DRY*/
  //   if (username.value === "") {
  //     showError(username, "User name is required");
  //   } else {
  //     showSuccess(username);
  //   }

  //   if (email.value === "") {
  //     showError(email, "Email is required");
  //   } else if (!isValidEmail(email.value)) {
  //     showError(email, "Enter Valid Email");
  //   } else {
  //     showSuccess(email);
  //   }

  //   if (password.value === "") {
  //     showError(password, "Password is required");
  //   } else {
  //     showSuccess(password);
  //   }

  //   if (password2.value === "") {
  //     showError(password2, "Password is required");
  //   } else {
  //     showSuccess(password2);
  //   }
});
