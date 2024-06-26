import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

interface Props {
    className?: string
}

export default function NavBar({ className = '' }: Props) {
    return (
        <nav className={`${className} flex justify-between items-center gap-16 w-full p-4 text-white bg-primary-900`}>
            <Image src={"/logo/tecnm_logo.png"} alt="Logo TecNM" width={120} height={60} />
            <div className="flex justify-between items-center gap-12">
                <Link href={"/teachers"} className="text-white/60 font-semibold hover:text-white/100 duration-300">Ver mis profesores</Link>
                <Link href='/profile'>
                    <FaUserCircle size={32} />
                </Link>
            </div>
        </nav>
    )
}