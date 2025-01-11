import { ValidationErrors, SignupFormData, SigninFormData } from "@/types/auth";

export const validateSignupForm = (data: SignupFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name?.trim()) {
    errors.name = ["Name is required"];
  } else if (data.name.length < 1) {
    errors.name = ["Name must be at least 1 characters long"];
  }

  if (!data.email?.trim()) {
    errors.email = ["Email is required"];
  } else if (!isValidEmail(data.email)) {
    errors.email = ["Please enter a valid email address"];
  }

  if (!data.password) {
    errors.password = ["Password is required"];
  } else {
    const passwordErrors = [];
    if (data.password.length < 8) {
      passwordErrors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(data.password)) {
      passwordErrors.push("Need one uppercase letter");
    }
    if (!/[0-9]/.test(data.password)) {
      passwordErrors.push("Password must contain at least one number");
    }
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors;
    }
  }

  if (!data.role) {
    errors.role = ["Please select a role"];
  } else if (!["MANAGER", "STAFF", "DELIVERY"].includes(data.role)) {
    errors.role = ["Invalid role selected"];
  }

  return errors;
};

export const validateSigninForm = (data: SigninFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.email?.trim()) {
    errors.email = ["Email is required"];
  } else if (!isValidEmail(data.email)) {
    errors.email = ["Please enter a valid email address"];
  }

  if (!data.password) {
    errors.password = ["Password is required."];
  }
  if (data.password.length < 8) {
    errors.password = ["Password must be 8 character long!"];
  }

  return errors;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
