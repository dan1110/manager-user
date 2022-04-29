export const userValidate = (values) => {
  let errors = {};

  if (!values.idUserName) {
    errors.idUserName = {
      type: "required",
      message: "Please enter idUserName",
    };
  }

  if (!values.userName) {
    errors.userName = {
      type: "required",
      message: "Please enter username",
    };
  }

  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Please enter password",
    };
  }

  if (!values.confirm) {
    errors.confirm = {
      type: "required",
      message: "Please enter confirm password",
    };
  } else if (values.password !== values.confirm) {
    errors.confirm = {
      type: "required",
      message: "Confirm password not match",
    };
  }

  return errors;
};
