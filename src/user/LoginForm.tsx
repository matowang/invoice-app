import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must contain more than 5 characters"),
});

type LoginValues = z.infer<typeof LoginSchema>;

interface LoginFormProps {
    onSubmit: (data: LoginValues) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const { register, handleSubmit: handleFormHookSubmit, watch, formState: { errors } } = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema)
    });

    const handleSubmit = (data: LoginValues) => {
        console.log(data);
        onSubmit(data);
    }

    return (
        <>
            <h1 className='my-3 text-lg'>Login</h1>
            <form onSubmit={handleFormHookSubmit(handleSubmit)} className="flex flex-col gap-5">
                <TextField {...register("email")}
                    defaultValue="test@gmail.com"
                    error={!!errors.email}
                    helperText={errors.email?.message} />
                <TextField type="password" {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button type="submit" variant='contained'>Submit</Button>
            </form>
        </>
    )
}

export default LoginForm;