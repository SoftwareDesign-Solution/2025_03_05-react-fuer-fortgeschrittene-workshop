import { ButtonHTMLAttributes, FC, PropsWithChildren, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}
const Button: FC<PropsWithChildren<ButtonProps>> = (props: ButtonProps)=> {
    return (
        <button type="button" {...props} onClick={props.onClick} className={`${props.className} rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
            {props.children}
        </button>
    )
};

export { Button };