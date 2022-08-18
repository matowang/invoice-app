import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from "zod";

const RegisterSchema = z.object({
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
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const { register, handleSubmit: handleFormHookSubmit, formState: { errors }, getValues, watch } = useForm<RegisterValues>({
        resolver: zodResolver(RegisterSchema)
    });

    const handleSubmit = (data: RegisterValues) => {
        onSubmit(data);
    }

    return (
        <>
            <h1 className='my-3 text-lg'>Register</h1>
            <form onSubmit={handleFormHookSubmit(handleSubmit)} className="flex flex-col gap-5">
                <TextField {...register("email")}
                    defaultValue="test@gmail.com"
                    error={!!errors.email}
                    helperText={errors.email?.message} />
                <TextField type="password" {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <TextField type="password"
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />
                <Button type="submit" variant='contained'>Submit</Button>
            </form>
        </>
    )
}

export default RegisterForm;