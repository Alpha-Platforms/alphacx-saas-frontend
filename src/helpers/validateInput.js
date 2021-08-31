let error = "";
export const ValidateInput = (expression) => {
  switch (true) {
    case expression === "":
      error = "Please fill out this input!";
      return error;

    case expression.length < 2 || expression.length > 300:
      error =
        "Value must not be longer than 20 digits or shorter than 3 digits";
      return error;

    default:
      return (error = "Looks Good!");
  }
};

export const ValidateEmail = (expression) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      expression
    )
  ) {
    return (error = "Looks Good!");
  }
  return false;
};



export const validatePassword = (pw) => {
  if (pw === "") {
    return (error = "Password must not be empty.");
  }

  //minimum password length validation  
  if (pw.length < 8) {
    return (error = "Password must be greater than 8 character.");

  }

  //maximum length of password validation  
  if (pw.length > 15) {
    return (error = "Password must not be greater than 15 character.");
  }


  if (pw.search(/[a-z]/i) < 0) {
    return error = "Your password must contain at least one letter.";
  }
  // if (pw.search(/[0-9]/) < 0) {
  //  return  error="Your password must contain at least one digit."; 
  // }
  else {
    return (error = "Looks Good!");
  }
}