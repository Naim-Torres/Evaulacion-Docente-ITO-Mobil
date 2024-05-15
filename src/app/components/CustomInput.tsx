import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
    className?: string
    placeholder?: string
    type: HTMLInputTypeAttribute
    register: UseFormRegister<Props>
}

function CustomInput({ className, placeholder, type = 'text', register }: Props) {
    return (
        <input className={`
			outline-none py-3 px-4 rounded-xl text-sm placeholder:text-slate-500 placeholder:text-sm border-2 border-primary-500/0 bg-primary-100 duration-300 focus:shadow-sm focus:border-primary-600 focus:text-primary-900
			${className}
		`} type={type} placeholder={placeholder} {...(register)} />
    )
}

export default CustomInput;