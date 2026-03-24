import { message } from "antd";
import { useEffect, useState, type FC } from "react";

import { useFormik } from "formik";

import { CheckboxField } from "@/components/CheckboxField";
import { ClearIcon } from "@/components/icons/ClearIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import { Logo } from "@/components/icons/Logo";
import { UserIcon } from "@/components/icons/UserIcon";
import { InputField } from "@/components/InputField";
import { PrimaryButton } from "@/components/PrimaryButton";
import {
  Content,
  Divider,
  Fields,
  Footer,
  FooterLink,
  Form,
  LogoWrapper,
  RememberRow,
  Subtitle,
  Title,
  TitleWrapper,
  Wrapper,
} from "./LoginPage.styled";
import {
  LOGIN_PAGE_INITIAL_VALUES,
  loginPageValidationSchema,
} from "./LoginPage.constants";
import { type LoginFormValues } from "../login.types";
import type { LoginPageProps } from "./LoginPage.types";

export const LoginPage: FC<LoginPageProps> = ({
  rememberMe,
  setRememberMe,
  handleLogin,
  isLoading,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    void message.error(errorMessage);
  }, [errorMessage]);

  const formik = useFormik<LoginFormValues>({
    initialValues: LOGIN_PAGE_INITIAL_VALUES,
    validationSchema: loginPageValidationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        await handleLogin(values);
      } catch {
        return;
      }
    },
  });

  useEffect(() => {
    if (formik.submitCount === 0 || formik.isValid) {
      return;
    }

    const firstValidationError = Object.values(formik.errors)[0];

    if (typeof firstValidationError === "string") {
      void message.error(firstValidationError);
    }
  }, [formik.submitCount, formik.isValid, formik.errors]);

  return (
    <Wrapper>
      <Form onSubmit={formik.handleSubmit}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <TitleWrapper>
          <Title>Добро пожаловать!</Title>
          <Subtitle>Пожалуйста, авторизируйтесь</Subtitle>
        </TitleWrapper>
        <Content>
          <Fields>
            <InputField
              id="login"
              name="login"
              label="Логин"
              type="text"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Введите логин"
              autoComplete="username"
              hasError={Boolean(formik.touched.login && formik.errors.login)}
              errorMessage={
                formik.touched.login ? formik.errors.login : undefined
              }
              leadingIcon={<UserIcon />}
              trailingAction={
                formik.values.login
                  ? {
                      ariaLabel: "Очистить логин",
                      icon: <ClearIcon />,
                      onClick: () => {
                        void formik.setFieldValue("login", "");
                      },
                    }
                  : undefined
              }
            />

            <InputField
              id="password"
              name="password"
              label="Пароль"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Введите пароль"
              autoComplete="current-password"
              hasError={Boolean(
                formik.touched.password && formik.errors.password,
              )}
              errorMessage={
                formik.touched.password ? formik.errors.password : undefined
              }
              leadingIcon={<LockIcon />}
              trailingAction={{
                ariaLabel: showPassword ? "Скрыть пароль" : "Показать пароль",
                icon: <EyeIcon crossed={!showPassword} />,
                onClick: () => setShowPassword((value) => !value),
              }}
            />
          </Fields>

          <RememberRow>
            <CheckboxField
              checked={rememberMe}
              label="Запомнить данные"
              onChange={(checked) => {
                setRememberMe(checked);
              }}
            />
          </RememberRow>

          <PrimaryButton type="submit" loading={isLoading}>
            Войти
          </PrimaryButton>

          <Divider>или</Divider>

          <Footer>
            <span>Нет аккаунта?</span>
            <FooterLink type="button">Создать</FooterLink>
          </Footer>
        </Content>
      </Form>
    </Wrapper>
  );
};
