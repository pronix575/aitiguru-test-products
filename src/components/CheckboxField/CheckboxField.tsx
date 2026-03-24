import { Box, HiddenInput, Root, Text } from "./CheckboxField.styled";

type CheckboxFieldProps = {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

export const CheckboxField = ({
  checked,
  label,
  onChange,
}: CheckboxFieldProps) => {
  return (
    <Root>
      <HiddenInput
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <Box />
      <Text>{label}</Text>
    </Root>
  );
};
