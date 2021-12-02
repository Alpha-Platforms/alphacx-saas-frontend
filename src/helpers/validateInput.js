import NotificationManager from "react-notifications/lib/NotificationManager";

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
  if (pw.length < 8 || pw.length > 20) {
    return (error = "Password must be between 8 and 20 characters.");
  }
  // if (pw.search(/[a-z]/i) < 0) {
  //   return error = "Your password must contain at least one letter.";
  // }
  if (pw.search(/[0-9]/) < 0) {
   return  error="Your password must contain at least one digit."; 
  }
}

// validation should just check value and return true/false - isValidated
export const Validate  = {

  email: (e, state, setState) => {

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)){
      NotificationManager.warning("Enter a valid email", "Validation Error", 4000);
      return setState(prev => ({
      ...prev,
      [e.target.name]: ""
    }));
    } 
    

  }

  ,

  password: (e, state, setState) => {
    const error = validatePassword(e.target.value)
    if(error){
      NotificationManager.warning(error, "Validation Error", 4000);
      return setState({
        ...state,
        password: ""
      })
    }
    
  }

  ,

  length: (e, state, setState) => {
    if (e.target.value.length < 2 || e.target.value.search(/[a-z]/i) < 0) {
      NotificationManager.warning("Enter a proper name", "Validation Error", 4000);

      setState({
        ...state,
        [e.target.name]: ""
      })
    }
  }

  ,

  ngPhone: (e, state, setState) => {
    if (e.target.value.length < 9 || !(/[0-9]/g.test(e.target.value))) {
      NotificationManager.warning("Enter a valid phone number", "Validation Error", 4000);
      return setState({
        ...state,
        [e.target.name]: ""
      })
    }
  }  

  ,

  noSpecialChars: (e, state, setState) => {
    if (!(/^[A-Za-z0-9]{3,}$/.test(e.target.value))) {
      NotificationManager.warning("3 or more letters or numbers only", "Special Character Detected", 4000);
      setState({
        ...state,
        [e.target.name]: ""
      })
      return false;
    } 
    return true;
  }
}