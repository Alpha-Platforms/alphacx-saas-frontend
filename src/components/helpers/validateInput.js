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
  return (error = "Opps email format not valid!");
};
