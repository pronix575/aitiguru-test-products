import { useState } from "react";

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

export const LoginPage = () => {
  const [login, setLogin] = useState("test");
  const [password, setPassword] = useState("password12345");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper>
      <Form onSubmit={(event) => event.preventDefault()}>
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
              label="Логин"
              type="text"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Введите логин"
              autoComplete="username"
              leadingIcon={<UserIcon />}
              trailingAction={
                login
                  ? {
                      ariaLabel: "Очистить логин",
                      icon: <ClearIcon />,
                      onClick: () => setLogin(""),
                    }
                  : undefined
              }
            />

            <InputField
              id="password"
              label="Пароль"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите пароль"
              autoComplete="current-password"
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
              checked={remember}
              label="Запомнить данные"
              onChange={setRemember}
            />
          </RememberRow>

          <PrimaryButton type="submit">Войти</PrimaryButton>

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
