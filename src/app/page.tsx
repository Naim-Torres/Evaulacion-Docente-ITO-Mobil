'use client'
import { useSession, signOut } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

    if(session){
        return (
            <div>
                <h2>Hola a {session?.user?.name}</h2>
                <button onClick={() => signOut()}>Cerrar sesión</button>
            </div>
        )   
    }

    return (
        <h2>Hola, adios</h2>
    );
}
