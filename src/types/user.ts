export interface SignUpForm {
  email?: string | "";
  name?: string | "";
  password?: string | "";
  confirmPassword?: string | "";
}

export interface SignInForm {
  email?: string;
  password?: string;
}

export interface User {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}
