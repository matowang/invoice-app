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
			className={`rounded-full bg-cyan-700 text-white opacity-90 hover:opacity-100 drop-shadow-md disabled:opacity-30 px-4 py-2 transition-opacity flex gap-2 items-center font-medium justify-center relative w-full ${
				props.size ? sizeClass[props.size] : ""
			}`}
		>
			{props.startIcon}
			{props.children}
		</button>
	);
};
export default Button;
