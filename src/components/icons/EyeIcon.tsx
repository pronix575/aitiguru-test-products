type EyeIconProps = {
  crossed?: boolean;
};

export const EyeIcon = ({ crossed = false }: EyeIconProps) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path
      d="M5.33337 16C7.46671 11.7334 11.2 9.33337 16 9.33337C20.8 9.33337 24.5334 11.7334 26.6667 16C24.5334 20.2667 20.8 22.6667 16 22.6667C11.2 22.6667 7.46671 20.2667 5.33337 16Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 19C17.6569 19 19 17.6569 19 16C19 14.3432 17.6569 13 16 13C14.3432 13 13 14.3432 13 16C13 17.6569 14.3432 19 16 19Z"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    {crossed ? (
      <path
        d="M7 7L25 25"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    ) : null}
  </svg>
);
