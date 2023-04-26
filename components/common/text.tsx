export const Text = ({component, className, ...props}: {component?: (props: any) => JSX.Element} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => {
    const Component = component ?? ((props: any) => <p {...props} />);

    return <Component {...props} className={`${className}`}/>
}