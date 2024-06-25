'use client';

import InvalidTokenIcon from "../icons/InvalidTokenIcon";
import { useRouter } from "next/navigation";

export default function InvalidToken() {
    const router = useRouter();

    return (
        <main className="flex justify-center items-center w-full h-screen p-8 sm:p-16 bg-primary-100">
            <div className="overflow-hidden flex flex-col items-center gap-12 w-full max-w-[500px] h-[600px] p-12 rounded-lg shadow-lg duration-300 hover:shadow-xl bg-white">
                {/* ILLUSTRATION */}
                <InvalidTokenIcon width={'100%'} height={'100%'} />

                <div>
                    <h1 className="title highlight mb-8sm:mb-0">Token inválido</h1>
                    <p className="mt-4">Al parecer el token para recuperrar este correo no es correcto o ya expiró. Si necesitas restablecer tu contraseña accede a &quot;¿Olvidate tu contraseña?&quot; y sigue las instrucciones.</p>
                </div>

                <button onClick={() => router.push('/auth/login')} className="bg-primary-900">Regresar a Inicio de Sesión</button>
            </div>
        </main>
    )
}
