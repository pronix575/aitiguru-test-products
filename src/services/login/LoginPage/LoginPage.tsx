import { Logo } from "@/components/icons/Logo";
import {
  Form,
  LogoWrapper,
  Subtitle,
  Title,
  TitleWrapper,
  Wrapper,
} from "./LoginPage.styled";

export const LoginPage = () => {
  return (
    <Wrapper>
      <Form>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <TitleWrapper>
          <Title>Добро пожаловать!</Title>
          <Subtitle>Пожалуйста, авторизируйтесь</Subtitle>
        </TitleWrapper>
      </Form>
    </Wrapper>
  );
};
