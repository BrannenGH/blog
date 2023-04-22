import { useEffect, useState } from "react";

export const Drawer = ({ show, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { show: boolean }) => {
    const [transitioning, setTransitioning] = useState(true);

    useEffect(() => {
        if (show) {
            setTransitioning(false);
        }
    }, [show]);

    const handleTransitionEnd = () => {
        if (!show) {
            setTransitioning(true);
        }
    };

    return <div {...props} 
       className={`${className} transform-gpu transition-transform duration-150 ease-in-out z-10 md:static
        ${show ? " left-0" : " translate-x-full"}
        ${transitioning ? " hidden" : ""}`}

        onTransitionEnd={handleTransitionEnd}
    />;
}