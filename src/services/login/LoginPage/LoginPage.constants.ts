import * as yup from "yup";

export type LoginPageFormValues = {
  login: string;
  password: string;
  remember: boolean;
};

export const loginPageValidationSchema = yup.object({
  login: yup
    .string()
    .trim()
    .required("Введите логин")
    .min(3, "Логин должен содержать минимум 3 символа"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Пароль должен содержать минимум 6 символов"),
  remember: yup.boolean().required(),
});
