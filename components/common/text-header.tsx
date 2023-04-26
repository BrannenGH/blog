export const TextHeader = ({
  component,
  className,
  ...props
}: { component?: (props: any) => JSX.Element } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const Component = component ?? ((props: any) => <h1 {...props} />);

  return (
    <Component
      className={`text-grey-600 drop-shadow-sm font-heading ${className}`}
      {...props}
    />
  );
};
