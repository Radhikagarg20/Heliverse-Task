import { Role } from "@prisma/client";

export type ValidationErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  role?: string[];
  general?: string[];
};

export type FormState = {
  errors?: ValidationErrors;
  success?: boolean;
  credentials?: {
    email: string;
    password: string;
  };
};

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type SigninFormData = {
  email: string;
  password: string;
};
