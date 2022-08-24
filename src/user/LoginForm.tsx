import { Button, TextField } from '@mui/material';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must contain more than 4 characters").max(16, "Password can't be more than 16 characters"),
});

export type LoginValues = z.infer<typeof LoginSchema>;

interface LoginFormProps {
    onSubmit: (data: LoginValues) => void;
    formError: string | null;
    disabled: boolean;
}

const LoginForm = ({ onSubmit, formError, disabled }: LoginFormProps) => {
    const { register, handleSubmit: handleFormHookSubmit, formState: { errors } } = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema)
    });

    const handleSubmit = async (data: LoginValues) => {
        if (disabled) return;
        await onSubmit(data);
    }

    return (
        <>
            <h1 className='my-3 text-lg'>Login</h1>
            {formError && <p className='text-red-400' data-test='form-error'>{formError}</p>}
            <form onSubmit={handleFormHookSubmit(handleSubmit)} className="flex flex-col gap-5">
                <TextField {...register("email")}
                    data-test='email'
                    label="Email"
                    placeholder='myemail@toptal.com'
                    error={!!errors.email}
                    helperText={errors.email && <span data-test='email-error'>{errors.email?.message}</span>}
                    disabled={disabled} />
                <TextField {...register("password")}
                    type="password"
                    data-test='password'
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password && <span data-test='password-error'>{errors.password?.message}</span>}
                    disabled={disabled}
                />
                <Button type="submit" variant='contained' disabled={disabled} data-test='submit-login'>Login</Button>
            </form>
        </>
    )
}

export default LoginForm;