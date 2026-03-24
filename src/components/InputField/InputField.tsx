import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";

import {
  ActionButton,
  FieldGroup,
  InputIcon,
  InputShell,
  Label,
  StyledInput,
} from "./InputField.styled";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  leadingIcon?: ReactNode;
  trailingAction?: {
    ariaLabel: string;
    icon: ReactNode;
    onClick: () => void;
  };
};

export const InputField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  leadingIcon,
  trailingAction,
}: InputFieldProps) => {
  return (
    <FieldGroup>
      <Label htmlFor={id}>{label}</Label>
      <InputShell>
        {leadingIcon ? <InputIcon>{leadingIcon}</InputIcon> : null}
        <StyledInput
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {trailingAction ? (
          <ActionButton
            type="button"
            aria-label={trailingAction.ariaLabel}
            onClick={trailingAction.onClick}
          >
            {trailingAction.icon}
          </ActionButton>
        ) : null}
      </InputShell>
    </FieldGroup>
  );
};
