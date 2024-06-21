'use client';

import CustomInput from "@/app/components/CustomInput";
import { useForm } from 'react-hook-form';
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner";
import { useEffect } from 'react'
import { FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import Link from "next/link";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            if (session) {
                router.push('/')
            }
        }
        checkSession()
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        // CustomToast.loading('Iniciando sesión');
        toast.loading("Iniciando sesión");

        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        toast.dismiss();

        if (res.error) {
            // CustomToast.error(res.error);
            toast.error(res.error);
        } else {
            router.push('/')
        }
    })

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <>
            <Toaster theme="light" richColors visibleToasts={1} position="top-center" />
            <main className="flex justify-center items-center w-full h-screen p-2 bg-primary-100">
                <div
                    className="
                        overflow-hidden flex flex-col w-full max-w-[800px] h-[560px] rounded-lg shadow-md duration-300 hover:shadow-xl
                        sm:flex-row
                    "
                >
                    {/* TARJETA DE INFORMACIÓN */}
                    <div
                        className="
                            flex flex-col justify-between w-full h-full p-8 bg-primary-900
                            sm:w-1/2
                        ">
                        <div className="flex items-center justify-between ">
                            <Image src="/logo/tecnm_logo.png" alt="TecNM Logo" width={170} height={100} />
                            <Image src="/logo/ito_logo.png" alt="ITO Logo" width={80} height={100} />
                        </div>
                        <div
                            className="
                                hidden flex-col gap-4
                                sm:flex
                            "
                        >
                            <h2 className="title text-white mt-8">Bienvenido</h2>
                            <p className="font-light text-sm text-white">
                                Estas a punto de entrar al sistema de evaluación docente por honorarios, por favor recuerda hacer un buen uso de la información...
                            </p>
                        </div>

                    </div>

                    {/* FORMULARIO */}
                    <div
                        className="
                            flex flex-col gap-8 md:gap-6 w-full h-full py-16 px-8 bg-white
                            sm:w-1/2
                        "
                    >
                        <form className="flex flex-col justify-between h-full">
                            <h1
                                className="
                                    title highlight mb-8
                                    sm:mb-0
                                "
                            >Iniciar sesión</h1>

                            <div className="flex flex-col items-end gap-4 mb-8">
                                {/* EMAIL */}
                                <div className="w-full">
                                    <CustomInput register={
                                        register('email', {
                                            required: {
                                                value: true,
                                                message: 'Introduzca su correo electrónico'
                                            },
                                            pattern: {
                                                value: /^[a-z0-9]+@itoaxaca\.edu\.mx$/,
                                                message: 'El correo no es válido'
                                            }
                                        })
                                    } type="email" className={`w-full ${errors.email ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Correo electrónico" />
                                    {errors.email && (
                                        <span className="pl-5 text-xs font-light text-red-500">{errors.email.message}</span>
                                    )}
                                </div>

                                {/* PASSWORD: */}
                                <div className="w-full">
                                    <CustomInput register={
                                        register('password', {
                                            required: {
                                                value: true,
                                                message: 'Introduzca su contraseña'
                                            }
                                        })
                                    }
                                        type="password" className={`w-full ${errors.password ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Contraseña" />
                                    {errors.password && (
                                        <span className="pl-5 text-xs font-light text-red-500">{errors.password.message}</span>
                                    )}
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex gap-3 w-full">
                                <button onClick={handleGoogleLogin} className="secondary w-full"><FaGoogle /></button>
                                <button onClick={onSubmit} className="w-full bg-primary-900 text-nowrap">Iniciar sesión</button>
                            </div>
                            <Link href={"/resetPassword/email"} className="text-sm text-slate-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default LoginPage;