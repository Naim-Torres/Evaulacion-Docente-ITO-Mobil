'use client';

import CustomInput from "@/app/components/CustomInput";
import { useForm } from 'react-hook-form';
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner";
import { useEffect } from 'react'
import Image from 'next/image';
import Link from "next/link";

import QR from "/public/images/qr.png";

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
            toast.error(res.error);
        } else {
            router.push('/')
        }
    })

    return (
        <>
            <main className="flex justify-center items-center w-full h-screen p-8 bg-primary-100">
                <Toaster richColors position="top-center" visibleToasts={1}/>
                <div
                    className="overflow-hidden flex flex-col sm:flex-row w-full max-w-[800px] h-fit rounded-lg shadow-md duration-300 hover:shadow-xl"
                >
                    {/* TARJETA DE INFORMACIÓN */}
                    <div className="flex flex-col justify-between w-full sm:w-1/2 min-h-full p-8 bg-primary-900">
                        <div className="flex items-center justify-between h-fit">
                            <Image src="/logo/tecnm_logo.png" alt="TecNM Logo" width={160} height={60} />
                            <Image src="/logo/ito_logo.png" alt="ITO Logo" width={80} height={60} />
                        </div>
                        <div className="flex-col gap-4 hidden sm:flex h-full">
                            <div className="flex flex-col gap-2 items-center justify-center h-full text-white pt-8">
                                <Image src={QR} alt="QR a la aplicación" width={200} className="rounded-lg" />
                                <span className="text-center text-sm max-w-[200px]">¿Quieres iniciar sesión desde su celular?, escanea el código QR</span>
                            </div>
                            <h2 className="text-xl font-semibold text-center text-white mt-8">Evaluación docente por honorarios</h2>    
                        </div>

                    </div>

                    {/* FORMULARIO */}
                    <div className="flex flex-col gap-8 w-full sm:w-1/2 h-full py-12 md:py-16 px-8 bg-white">
                        <form className="flex flex-col gap-8 justify-between h-full">
                            <h1 className="title highlight">Iniciar sesión</h1>

                            <div className="flex justify-center gap-4 text-sm">
                                <a href={process.env.WORKFORCE_APP_URL} target="_black" rel="noopener noreferrer" className="w-full text-center py-2 px-4 rounded-md duration-300 cursor-pointer hover:bg-primary-200">Personal</a>
                                <span className="w-full text-white text-center py-2 px-4 rounded-md bg-primary-900 duration-300 cursor-pointer hover:bg-primary-900/95">Estudiantes</span>
                            </div>

                            <div className="flex flex-col items-end gap-4 mt-8 mb-8">
                                {/* EMAIL */}
                                <div className="w-full">
                                    <CustomInput
                                        register={
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
                                        }
                                        onKeyDown={(event) => {
                                            if (event.key == "Enter") {
                                                setFocus("password");
                                            }
                                        }}
                                        type="email"
                                        className={`w-full ${errors.email ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Correo electrónico"
                                    />
                                    {errors.email && (
                                        <span className="pl-5 text-xs font-light text-red-500">{errors.email.message}</span>
                                    )}
                                </div>

                                {/* PASSWORD: */}
                                <div className="w-full">
                                    <CustomInput
                                        register={
                                            register('password', {
                                                required: {
                                                    value: true,
                                                    message: 'Introduzca su contraseña'
                                                }
                                            })
                                        }
                                        onKeyDown={(event) => {
                                            if (event.key == "Enter") {
                                                onSubmit();
                                            }
                                        }}
                                        type="password"
                                        className={`w-full ${errors.password ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Contraseña"
                                    />
                                    {errors.password && (
                                        <span className="pl-5 text-xs font-light text-red-500">{errors.password.message}</span>
                                    )}
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex justify-center">
                                <button onClick={onSubmit} className="w-fit px-16 bg-primary-900 text-nowrap">Iniciar sesión</button>
                            </div>
                            <Link href={"/resetPassword/password"} className="text-sm text-slate-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default LoginPage;