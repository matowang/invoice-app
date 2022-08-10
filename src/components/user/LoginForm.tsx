import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
    onSubmit: (data: any) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <TextField defaultValue="test@gmail.com" {...register("email")} />
            <TextField type="password" {...register("password")} />
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default LoginForm;