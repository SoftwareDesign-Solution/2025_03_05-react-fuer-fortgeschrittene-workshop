- [1. Formulare mit Validierung erweitern](#1-formulare-mit-validierung-erweitern)
  - [1.1 Registrierungsformular um Validierung erweitern](#11-registrierungsformular-um-validierung-erweitern)
  - [1.2 Erweitern Sie das Loginformular](#12-loginformular-um-validierung-erweitern)

Bearbeitungszeit: 30 Minuten

The solution branch for the whole lab is `solution-1-forms`

# 1. Formulare mit Validierung erweitern

Um eine bessere Benutzererfahrung und Datensicherheit zu gewährleisten, sollen die Formulare für Registrierung und Login um eine Validierung mit react-hook-form und zod erweitert werden.

**Hinweise:**

- Installieren Sie die benötigten Bibliotheken mit:

  ```bash
  npm install react-hook-form zod @hookform/resolvers
  ```

- Nutzen Sie `zodResolver` aus `@hookform/resolvers/zod`, um die Validierung in `react-hook-form` zu integrieren.

## 1.1 Registrierungsformular um Validierung erweitern

- Nutzen Sie `react-hook-form` für die Formularsteuerung.
- Verwenden Sie `zod`, um die folgenden Validierungsregeln zu definieren:
  - **Vorname**: Pflichtfeld
  - **Nachname**: Pflichtfeld
  - **E-Mail**: Pflichtfeld, muss eine gültige E-Mail-Adresse sein
  - **Passwort**: Pflichtfeld, mindestens 8 Zeichen
- Zeigen Sie entsprechende Fehlermeldungen an, wenn die Validierung fehlschlägt.
- Bei erfolgreicher Validierung soll die `onSubmit`-Methode aufgerufen werden und der Inhalt des Formulars mit `console.log` ausgegeben werden.

<details>
<summary>Show solution</summary>
<p>

### Validierung mit Zod

**/src/features/auth/pages/registerpage/RegisterPage.tsx**

```typescript
import { useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/Button";

const registerFormSchema = z.object({
    firstName: z.string().min(1, 'Vorname ist erforderlich'),
    lastName: z.string().min(1, 'Nachname ist erforderlich'),
    email: z.string().email('E-Mail ist erforderlich'),
    password: z.string().min(8, 'Passwort ist erforderlich')
});

type FormData = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(registerFormSchema)
    });

    const onSubmit = async (data: FormData) => {
        
        console.log(data);

        reset();

    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 id="title" className="text-2xl">Register</h1>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Vorname */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">Vorname</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    placeholder="Max"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register('firstName')}
                                />
                            </div>
                            {/*<div className="mt-2 text-red-600">Vorname ist erforderlich</div>*/}
                            <div className="mt-2 text-red-600">{errors.firstName?.message}</div>
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
                                    {...register('lastName')}
                                />
                            </div>
                            {/*<div className="mt-2 text-red-600">Nachname ist erforderlich</div>*/}
                            <div className="mt-2 text-red-600">{errors.lastName?.message}</div>
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
                            <Button id="register" type="submit">
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
```

### Validierung ohne Zod

**/src/features/auth/pages/registerpage/RegisterPage.tsx**

```typescript
import { useForm } from "react-hook-form";
import { Button } from "@/components/button/Button";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
};

const RegisterPage = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        
        console.log(data);

        reset();

    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 id="title">Registrierung</h1>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Vorname */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">Vorname</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    placeholder="Max"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register('firstName', { required: 'Vorname ist erforderlich' })}
                                />
                            </div>
                            {errors.firstName && (<div className="mt-2 text-red-600">{errors.firstName.message}</div>)}
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
                                    {...register('lastName', { required: 'Nachname ist erforderlich' })}
                                    
                                />
                            </div>
                            {errors.lastName && (<div className="mt-2 text-red-600">{errors.lastName.message}</div>)}
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
                                    {...register('email', { required: 'E-Mail ist erforderlich', pattern: { value: /^\S+@\S+$/i, message: 'Ungültige E-Mail-Adresse' } })}
                                />
                            </div>
                            {errors.email && (<div className="mt-2 text-red-600">{errors.email.message}</div>)}
                        </div>
                        
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Passwort</label>
                            <div className="mt-2">
                                <input 
                                    type="password"  
                                    id="password" 
                                    placeholder=""
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register('password', { required: 'Passwort ist erforderlich', minLength: { value: 8, message: 'Mindestens 8 Zeichen' } })}
                                />
                            </div>
                            {errors.password && (<div className="mt-2 text-red-600">{errors.password.message}</div>)}
                        </div>

                        {/* Submit */}
                        <div>
                            <Button type="submit" id="password">
                                Register
                            </Button>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
};

export { RegisterPage };
```

</p>
</details>

## 1.2 Loginformular um Validierung erweitern

- Nutzen Sie `react-hook-form` für die Formularsteuerung.
- Verwenden Sie `zod`, um die folgenden Validierungsregeln zu definieren:
  - **E-Mail**: Pflichtfeld, muss eine gültige E-Mail-Adresse sein
  - **Passwort**: Pflichtfeld, mindestens 8 Zeichen
- Zeigen Sie entsprechende Fehlermeldungen an, wenn die Validierung fehlschlägt.
- Bei erfolgreicher Validierung soll die `onSubmit`-Methode aufgerufen werden und der Inhalt des Formulars mit `console.log` ausgegeben werden.

<details>
<summary>Show solution</summary>
<p>

### Validierung mit Zod

**/src/features/auth/pages/loginpage/LoginPage.tsx**

```typescript
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/Button";

const loginFormSchema = z.object({
    email: z.string().email('E-Mail ist erforderlich'),
    password: z.string().min(8, 'Passwort ist erforderlich')
});

type FormData = z.infer<typeof loginFormSchema>;

const LoginPage = () => {

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

        reset();
        
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 id="title" className="text-2xl">Login</h1>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    {/* Aufgabe 1 */}
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* E-Mail */}
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-Mail</label>
                            <div className="mt-2">
                                {/* Aufgabe 1 */}
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
                                {/* Aufgabe 1 */}
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
```

### Validierung ohne Zod

**/src/features/auth/pages/loginpage/LoginPage.tsx**

```typescript
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button/Button";

type FormData = {
    email: string;
    password: string
};

const LoginPage = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {

        console.log(data);

        reset();

    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 id="title">Login</h1>
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
                                    {...register('email', { required: 'E-Mail ist erforderlich', pattern: { value: /^\S+@\S+$/i, message: 'Ungültige E-Mail-Adresse' } })}
                                />
                            </div>
                            {errors.email && (<div className="mt-2 text-red-600">{errors.email.message}</div>)}
                        </div>
                        
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input 
                                    type="password" 
                                    id="password"
                                    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register('password', { required: 'Passwort ist erforderlich', minLength: { value: 8, message: 'Mindestens 8 Zeichen' } })}
                                />
                            </div>
                            {errors.password && (<div className="mt-2 text-red-600">{errors.password.message}</div>)}
                        </div>

                        {/* Submit */}
                        <div>
                            <Button type="submit" id="login">
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
```

</p>
</details>
