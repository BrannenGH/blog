/**
 * Renders a heading with a specified level and styles.
 * 
 * @param {number} [props.level=1] - The level of the heading. Must be a number between 1 and 6.
 * @param {Function} [props.component] - The custom component to use instead of the default heading element.
 * @param {string} [props.className] - The additional class name(s) to apply to the heading element.
 * 
 * @returns {JSX.Element} The TextHeader component.
 */
export const TextHeader = ({
  component,
  level,
  className,
  ...props
}: { level?: 1 | 2 | 3 | 4 | 5 | 6, component?: (props: any) => JSX.Element } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  level = level ?? 1;

  const levelClassNames = {
    1: "text-4xl mb-4",
    2: "text-3xl mb-4",
    3: "text-2xl mb-4",
    4: "text-xl mb-4",
    5: "text-lg mb-4",
    6: "text-base mb-4"
  };
  
  const levelDefaultComponent = {
    1: ((props: any) => <h1 {...props} />),
    2: ((props: any) => <h2 {...props} />),
    3: ((props: any) => <h3 {...props} />),
    4: ((props: any) => <h4 {...props} />),
    5: ((props: any) => <h5 {...props} />),
    6: ((props: any) => <h6 {...props} />),
  }

  const Component = component ?? levelDefaultComponent[level];

  return (
    <Component
      className={`text-grey-600 drop-shadow-sm font-heading ${levelClassNames[level]} ${className}`}
      {...props}
    />
  );
};
