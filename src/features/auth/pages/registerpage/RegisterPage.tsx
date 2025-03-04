import { Button } from "@/components/button/Button";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
};

const RegisterPage = () => {

    const onSubmit = async (data: FormData) => {
        //
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 id="title" className="text-2xl">Register</h1>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6">
                        
                        {/* Vorname */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">Vorname</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    placeholder="Max"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="mt-2 text-red-600">Vorname ist erforderlich</div>
                        </div>

                        {/* Nachname */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Nachname</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    placeholder="Mustermann"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="mt-2 text-red-600">Nachname ist erforderlich</div>
                        </div>

                        {/* E-Mail */}
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-Mail</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="email" 
                                    placeholder="you@example.com"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="mt-2 text-red-600">E-Mail ist erforderlich</div>
                        </div>
                        
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Passwort</label>
                            <div className="mt-2">
                                <input 
                                    type="password" 
                                    id="password"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="mt-2 text-red-600">Passwort ist erforderlich</div>
                        </div>

                        {/* Submit */}
                        <div>
                            <Button id="register" data-testid="register" type="submit">
                                Register
                            </Button>
                        </div>

                    </form>
                </div>

            </div>
        </>
    );
};

export { RegisterPage };