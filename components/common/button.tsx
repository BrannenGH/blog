export const Button = ({
  component,
  className,
  ...props
}: {
  component?: (props: any) => JSX.Element;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  const Component = component ?? ((props: any) => <button {...props} />);

  return (
    <Component
      {...props}
      role="button"
      className={`bg-soft-pink-500 p-1 rounded hover:bg-soft-pink-600 ${className}`}
    />
  );
};
