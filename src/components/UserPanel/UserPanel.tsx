import type { FC } from "react";
import { Wrapper } from "./UserPanel.styled";
import type { Props } from "./UserPanel.types";
import { Avatar } from "antd";

export const UserPanel: FC<Props> = ({ user }) => {
  return (
    <Wrapper>
      <Avatar src={user.image} />
      {user.firstName}
    </Wrapper>
  );
};
