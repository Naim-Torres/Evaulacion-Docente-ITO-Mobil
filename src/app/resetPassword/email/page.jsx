'use client';

import CustomInput from "@/app/components/CustomInput";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner";
import ConfirmIcon from "@/app/components/icons/ConfirmIcon";

export default function EmailPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        toast.loading("Verificando correo");

        //LÓGICA PARA ENVIAR CORREO
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve('Resolved')
            }, 1000);
        });

        toast.dismiss();

        if (true) {
            toast.success('El correo ha sido envíado correctamente');
        } else {
            toast.error('Error al enviar el correo');
        }
    })
    return (
        <>
            <Toaster theme="light" richColors visibleToasts={1} position="top-center" />
            <main className="flex justify-center items-center w-full h-screen p-8 sm:p-16 bg-primary-100">
                <div
                    className="
                        overflow-hidden flex flex-col items-center w-full max-w-[800px] h-[500px] rounded-lg shadow-lg duration-300 hover:shadow-xl
                        sm:flex-row
                    "
                >
                    {/* FORMULARIO */}
                    <div className="flex flex-col gap-8 md:gap-6 w-full md:w-1/2 h-full py-16 px-8 bg-white">
                        <form className="flex flex-col justify-between h-full">
                            <h1
                                className="
                                    title highlight mb-8
                                    sm:mb-0
                                "
                            >Recuperar contraseña</h1>
                            <p>Escribe el correo electrónico del cual quieras recuperar tu contraseña, enviaremos un correo con el link de recuperación.</p>

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
                                        <span className="pl-5 text-sm font-normal text-red-500">{errors.email.message}</span>
                                    )}
                                </div>
                            </div>
                        </form>
                        <div className="flex gap-3">
                            <button onClick={() => router.back()} className="w-1/2 secondary text-nowrap">Cancelar</button>
                            <button onClick={onSubmit} className="w-1/2 bg-primary-900 text-nowrap">Confirmar</button>
                        </div>
                    </div>

                    {/* ILLUSTRATION */}
                    <div className="hidden md:block w-1/2 p-12 bg-white">
                        <ConfirmIcon width={'100%'} />
                    </div>
                </div>
            </main>
        </>
    )
}
