'use client';

import { useRouter } from "next/navigation"
import SuccessIcon from "@/app/components/icons/SuccessIcon";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <main className="flex justify-center items-center w-full h-screen p-8 sm:p-16 bg-primary-100">
            <div
                className="
                        overflow-hidden flex flex-col items-center w-full max-w-[800px] h-[480px] rounded-lg shadow-lg duration-300 hover:shadow-xl
                        sm:flex-row
                    "
            >
                {/* FORMULARIO */}
                <div className="flex flex-col gap-8 md:gap-6 w-full md:w-1/2 h-full py-16 px-8 bg-white">
                    <div className="flex flex-col gap-3 h-full">
                        <h1
                            className="
                                    title highlight
                                    sm:mb-0
                                "
                        >Disfruta tu nueva contraseña</h1>
                        <p className="mt-8">¡Felicidades!, <span className="font-semibold text-slate-700">tu contraseña ha sido actualizada con éxito.</span></p>
                        <p>¡Prueba a iniciar sesión con tu nueva contraseña, y esta vez guárdala en un lugar más seguro!</p>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={() => router.push('/auth/login')} className="w-fit bg-primary-900 text-nowrap">Probar contraseña</button>
                    </div>
                </div>

                {/* ILLUSTRATION */}
                <div className="hidden md:flex justify-end items-center w-1/2 h-full p-12 bg-white">
                    <SuccessIcon width={'80%'} />
                </div>
            </div>
        </main>
    )
}
