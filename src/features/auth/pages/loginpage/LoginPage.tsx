import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginUser } from "../../store/authActions";

const loginFormSchema = z.object({
    email: z.string().email('E-Mail ist erforderlich'),
    password: z.string().min(8, 'Passwort ist erforderlich')
});

type FormData = z.infer<typeof loginFormSchema>;

const LoginPage = () => {

    const dispatch: AppDispatch = useDispatch();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(loginFormSchema)
    });
    
    const onSubmit = async (data: FormData) => {
    
        console.log(data);

        await dispatch(loginUser(data));

        reset();

    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 id="title" className="text-2xl">Login</h1>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* E-Mail */}
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-Mail</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="email" 
                                    placeholder="you@example.com"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register('email')}
                                />
                            </div>
                            {/*<div className="mt-2 text-red-600">E-Mail ist erforderlich</div>*/}
                            <div className="mt-2 text-red-600">{errors.email?.message}</div>
                        </div>
                        
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Passwort</label>
                            <div className="mt-2">
                                <input 
                                    type="password" 
                                    id="password"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register('password')}
                                />
                            </div>
                            {/*<div className="mt-2 text-red-600">Passwort ist erforderlich</div>*/}
                            <div className="mt-2 text-red-600">{errors.password?.message}</div>
                        </div>

                        {/* Submit */}
                        <div>
                            <Button id="login" type="submit">
                                Login
                            </Button>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
};

export { LoginPage };