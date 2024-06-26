'use client'
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import VoidIcon from "./components/icons/VoidIcon";

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(session && session.user.role == 'student') {
            router.push('/teachers');
        }else{
            setIsLoading(false);
        }
    }, [session]);


    return (
        <main className="flex flex-col gap-8 justify-center items-center w-full h-screen ">
            {!isLoading &&
                (
                    <>
                        <VoidIcon width={400} height={400} />
                        <div className="flex flex-col gap-2 items-center">
                            <h1 className="title"> ¿Estás perdido?</h1>
                            <span className="text-lg"> Este sitio es solo para cuentas de estudiantes</span>
                        </div>
                        <button
                            className="bg-primary-900"
                            onClick={() => signOut()}
                        >Cerrar sesión</button>
                    </>
                )
            }

        </main>
    );
}
