import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	startIcon?: ReactNode;
	size?: ButtonSize;
}

const sizeClass: Record<ButtonSize, string> = {
	small: "text-sm",
	medium: "text-md",
	large: "text-lg",
};

const Button = (props: ButtonProps) => {
	return (
		<button
			{...props}
			className={`rounded-full border-solid border border-cyan-700 text-cyan-700 disabled:opacity-30 px-4 py-2 bg-opacity-0 hover:bg-opacity-10 bg-cyan-700 transition-colors flex gap-2 items-center font-medium justify-center w-full ${
				props.size ? sizeClass[props.size] : ""
			}`}
		>
			{props.startIcon}
			{props.children}
		</button>
	);
};
export default Button;
