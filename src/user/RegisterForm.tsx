import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from "zod";

const RegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(5, "Password must contain more than 4 characters").max(16, "Password can't be more than 16 characters"),
    confirmPassword: z.string().min(5, "Password must contain more than 4 characters").max(16, "Password can't be more than 16 characters"),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"]
});

export type RegisterValues = z.infer<typeof RegisterSchema>;

interface RegisterFormProps {
    onSubmit: (data: RegisterValues) => void;
    formError: string | null;
    disabled: boolean;
}

const RegisterForm = ({ onSubmit, formError, disabled }: RegisterFormProps) => {
    const { register, handleSubmit: handleFormHookSubmit, formState: { errors } } = useForm<RegisterValues>({
        resolver: zodResolver(RegisterSchema)
    });

    const handleSubmit = async (data: RegisterValues) => {
        if (disabled) return;
        await onSubmit(data);
    }

    return (
        <>
            <h1 className='my-3 text-lg'>Sign-Up</h1>
            {formError && <p className='text-red-400' data-test='form-error'>{formError}</p>}
            <form onSubmit={handleFormHookSubmit(handleSubmit)} className="flex flex-col gap-5">
                <TextField {...register("name")}
                    label="Name"
                    placeholder="Matthew Wang"
                    error={!!errors.name}
                    helperText={errors.name && <span data-test="name-error">{errors.name?.message}</span>}
                    disabled={disabled}
                    data-test='name' />
                <TextField {...register("email")}
                    label="Email"
                    placeholder="myemail@toptal.com"
                    error={!!errors.email}
                    helperText={errors.email && <span data-test="email-error">{errors.email?.message}</span>}
                    disabled={disabled}
                    data-test='email' />
                <TextField type="password" {...register("password")}
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password && <span data-test="password-error">{errors.password?.message}</span>}
                    disabled={disabled}
                    data-test='password'
                />
                <TextField type="password"
                    {...register("confirmPassword")}
                    label="Confirm Password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword && <span data-test="confirm-password-error">{errors.confirmPassword?.message}</span>}
                    disabled={disabled}
                    data-test='confirm-password'
                />
                <Button
                    type="submit"
                    variant='contained'
                    disabled={disabled}
                    data-test='submit-sign-up'>Sign-Up</Button>
            </form>
        </>
    )
}

export default RegisterForm;