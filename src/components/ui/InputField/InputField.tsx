import type {
  ChangeEvent,
  FocusEvent,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

import {
  ActionButton,
  ErrorMessage,
  FieldGroup,
  InputIcon,
  InputShell,
  Label,
  StyledInput,
} from "./InputField.styled";

type InputFieldProps = {
  id: string;
  label: string;
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  hasError?: boolean;
  errorMessage?: string;
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
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  autoComplete,
  hasError = false,
  errorMessage,
  leadingIcon,
  trailingAction,
}: InputFieldProps) => {
  const errorId = errorMessage ? `${id}-error` : undefined;

  return (
    <FieldGroup>
      <Label htmlFor={id}>{label}</Label>
      <InputShell $hasError={hasError}>
        {leadingIcon ? <InputIcon>{leadingIcon}</InputIcon> : null}
        <StyledInput
          id={id}
          name={name ?? id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={errorId}
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
      {errorMessage ? <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage> : null}
    </FieldGroup>
  );
};
