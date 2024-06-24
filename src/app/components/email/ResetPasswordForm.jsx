import React from 'react'
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import CustomInput from '../CustomInput';
import { useForm } from 'react-hook-form';
import PasswordIcon from '../icons/PasswordIcon';

export default function ResetPasswordForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password === oldPassword) {
            toast.error("La nueva contraseña no puede ser la misma que la anterior");
            return;
        }

        toast.loading("Cambiando contraseña");

        //LÓGICA PARA ENVIAR CORREO
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve('Resolved')
            }, 1000);
        });

        toast.dismiss();

        if (true) {
            router.push('/resetPassword/success');
        } else {
            toast.error('Error al cambiar la contraseña');
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
                    <div className="flex flex-col gap-8 md:gap-6 w-full md:w-1/2 h-full py-12 px-8 bg-white">
                        <form className="flex flex-col justify-between h-full">
                            <h1
                                className="
                                    title highlight mb-8
                                    sm:mb-0
                                "
                            >Tu nueva contraseña</h1>
                            <p>Escribe tu nueva contraseña y confírmela.</p>

                            <div className="flex flex-col items-end gap-4 mb-6">
                                {/* PASSWORD */}
                                <div className="w-full">
                                    <CustomInput register={
                                        register('password', {
                                            required: {
                                                value: true,
                                                message: 'Introduzca su nueva contraseña'
                                            },
                                            minLength: {
                                                value: 8,
                                                message: 'La contraseña es demasiado corta'
                                            },
                                            maxLength: {
                                                value: 40,
                                                message: 'La contraseña es demasiado larga'
                                            }
                                        })
                                    } type="password" className={`w-full ${errors.email ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Contraseña" />
                                    {errors.password && (
                                        <span className="pl-5 text-sm font-normal text-red-500">{errors.password.message}</span>
                                    )}
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div className="w-full">
                                    <CustomInput register={
                                        register('confirmPassword', {
                                            required: {
                                                value: true,
                                                message: 'Confirme su nueva contraseña'
                                            },
                                            validate: value => value === watch('password') || "Las contraseñas no coinciden"
                                        })
                                    } type="password" className={`w-full ${errors.email ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Confirmar contraseña" />
                                    {errors.confirmPassword && (
                                        <span className="ml-5 text-sm font-normal text-red-500">{errors.confirmPassword.message}</span>
                                    )}
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button onClick={onSubmit} className="w-fit bg-primary-900 text-nowrap">Cambiar contraseña</button>
                        </div>
                    </div>

                    {/* ILLUSTRATION */}
                    <div className="hidden md:block w-1/2 p-12 bg-white">
                        <PasswordIcon width={'100%'} />
                    </div>
                </div>
            </main>
        </>
    )
}
