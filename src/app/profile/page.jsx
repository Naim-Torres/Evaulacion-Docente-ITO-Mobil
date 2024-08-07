'use client';

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import { useRouter } from "next/navigation";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

export default function ProfilePage() {
    const { data: session } = useSession();
    const navigation = useRouter();
    const [student, setStudent] = useState();
    const [isEditable, setIsEditable] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

    const fetchStudent = async () => {
        const res = await fetch(`/api/profile/${session?.user?.id}`);
        const resJson = await res.json();

        setStudent(resJson);
    }

    const initials = (name) => {
        const words = name.split(' ');
        let initials = '';

        words.slice(0, words.length > 1 ? 2 : words.length).map(word => initials += word[0]);

        return initials;
    }

    const submit = handleSubmit(async (data) => {
        const res = await fetch(`/api/profile/${session?.user?.id}`, {
            method: 'PUT',
            headers: {
                'ContentType': 'application/json'
            },
            body: JSON.stringify({
                password: data.password
            })
        });

        if (res.status == 200) {
            toast.success('La contraseña se ha guardado con éxito');
        } else {
            toast.error('Error al modificar la contraseña');
        }

        reset();
        setIsEditable(false);
    });

    const changeEditable = async () => {
        if (isEditable) {
            submit();
        } else {
            setIsEditable(true);
        }
    }

    useEffect(() => {
        fetchStudent();
    }, [session]);

    return (
        <>
            <Toaster theme="light" richColors visibleToasts={1} position="top-center" />
            <main className="flex justify-center items-center w-full h-screen bg-primary-100">
                <div className="overflow-hidden flex flex-col items-center gap-4 w-full sm:w-[360px] h-full sm:h-fit px-6 pt-6 pb-8 rounded-none sm:rounded-xl bg-white shadow-md duration-300 hover:shadow-lg">
                    {/* BUTTONS */}
                    <div className="flex justify-between w-full">
                        <div onClick={() => navigation.back()} className="group flex items-center cursor-pointer">
                            <IoIosArrowRoundBack size={24} className="duration-300 group-hover:-translate-x-1 text-slate-500" />
                            <span className="text-sm font-medium text-slate-500">Regresar</span>
                        </div>
                        <div onClick={() => changeEditable()} className={`group flex items-center gap-1 cursor-pointer p-2 rounded-md duration-300 ${isEditable ? "bg-primary-600 hover:bg-primary-500 text-white" : "bg-slate-100 hover:bg-primary-100 text-slate-500"}`}>
                            {isEditable ? (
                                <span className="text-sm font-medium">Guardar cambios</span>
                            ) : (
                                <span className="text-sm font-medium">Editar información</span>
                            )}
                        </div>
                    </div>

                    {/* PROFILE */}
                    <div className="flex flex-col items-center gap-1 mt-4 p x-2">
                        <div className="flex justify-center items-center w-20 aspect-square rounded-xl text-5xl font-bold text-white bg-primary-600">
                            {session && initials(session?.user?.name)}
                        </div>
                        <h1 className="mt-4 text-2xl font-bold">{session?.user?.name}</h1>
                        <span className="text-sm text-slate-600">{session?.user?.email}</span>
                    </div>

                    {/* INFO */}
                    <div className="flex gap-4 w-full mt-2 px-2">
                        <div className="w-1/2">
                            <label className="text-sm font-medium text-slate-500">Número de control</label>
                            <p className="font-medium">{student?.no_control}</p>
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm font-medium text-slate-500">Semestre</label>
                            <p className="font-medium">{student?.semester}</p>
                        </div>
                    </div>

                    <h2 className="w-full text-center px-2 border-b border-slate-300 pb-2 mt-8 text-slate-500">Sección de seguridad</h2>

                    {/* PASSWORD */}
                    <div className="flex flex-col items-start gap-2 w-full mt-2 px-2">
                        {!isEditable && (
                            <label className="text-sm font-medium text-slate-500" >Contraseña</label>
                        )}

                        {isEditable ? (
                            <div className="flex flex-col gap-1 w-full">
                                <CustomInput register={register('password', {
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
                                    },
                                    pattern: {
                                        value: /^\S*$/,
                                        message: "La contraseña no es válida"
                                    },
                                })} type="password" className={`w-full ${errors.email ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Contraseña" />
                                {errors.password && (
                                    <span className="pl-5 text-sm font-normal text-red-500">{errors.password.message}</span>
                                )}
                            </div>
                        ) : (
                            <p className="font-medium">********</p>
                        )}
                    </div>

                    {isEditable && (
                        <div className="px-2 w-full">
                            <div className="flex flex-col gap-1">
                                <CustomInput register={register('confirmPassword', {
                                    required: {
                                        value: true,
                                        message: 'Confirme su nueva contraseña'
                                    },
                                    validate: value => value === watch('password') || "Las contraseñas no coinciden"
                                })} type="password" className={`w-full ${errors.email ? 'border-2 focus:border-red-500/75 border-red-500/75' : ''}`} placeholder="Confirmar contraseña" />
                                {errors.confirmPassword && (
                                    <span className="pl-5 text-sm font-normal text-red-500">{errors.confirmPassword.message}</span>
                                )}
                            </div>
                        </div>
                    )}

                    {isEditable && (
                        <div className="flex flex-col text-sm text-slate-600">
                            <span className="font-semibold">Se recomienda que la contraseña contenga:</span>
                            <span>Al menos un número</span>
                            <span>Al menos un caracter especial</span>
                            <span>Al menos una mayúscula</span>
                        </div>
                    )}

                    {isEditable && (
                        <div onClick={() => setIsEditable(false)} className="mt-2 py-2 px-4 rounded-md text-center text-sm font-medium text-red-500 cursor-pointer duration-300 hover:bg-red-500 hover:text-white">Cancelar</div>
                    )}

                    {!isEditable && (
                        <div onClick={() => signOut()} className="flex items-center gap-2 mt-2 py-2 px-4 rounded-md text-center text-sm font-medium text-white cursor-pointer bg-red-500 duration-300 hover:bg-red-600">
                            <span>Cerrar sesión</span>
                            <IoExit size={24} />
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
