import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

interface Props {
    className?: string
}

export default function NavBar({ className = '' }: Props) {
    return (
        <nav className={`${className} flex justify-between items-center gap-16 w-full p-4 text-white bg-primary-900`}>
            <Image src={"/logo/tecnm_logo.png"} alt="Logo TecNM" width={120} height={60} />
            <div className="flex justify-between items-center gap-8">
                <span className="font-semibold">Profesores</span>
                <FaUserCircle size={32} />
            </div>
        </nav>
    )
}