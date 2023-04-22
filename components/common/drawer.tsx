import { useEffect, useState } from "react";

/**
 * A Drawer component that can be shown or hidden based on the `hide` prop.
 * The component will be removed from the DOM when hidden.
 * 
 * @component
 * @param { object } props - React props.
 * @param { boolean } [props.hide] - Whether the drawer is hidden or shown.
 * @param { string } [props.className] - Additional classes to be applied to the drawer.
 * @returns { JSX.Element | null } The rendered Drawer component or null if the component is hidden and the transition has ended.
 */
export const Drawer = ({ hide, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { hide?: boolean }) => {
    const [inDOM, setInDOM] = useState(!hide);

    useEffect(() => {
        // If the prop is false or undefined, it should always be in the DOM.
        if (!hide) {
            setInDOM(true);
        }
    }, [hide]);

    const handleTransitionEnd = () => {
        // At the end of a transition, it checks if the item is hidden, and if so,
        // removes it from the DOM.
        if (hide) {
            setInDOM(false);
        }
    };

    return inDOM ? <div {...props} 
       className={`${className ? className : ""} transform-gpu transition-transform duration-150 ease-in-out z-10 md:static` + 
        (hide ? " translate-x-full" : " left-0") }
        onTransitionEnd={handleTransitionEnd}
    /> : null;
}