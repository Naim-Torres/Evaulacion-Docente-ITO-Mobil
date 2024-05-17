import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

interface Props {
    className?: string
    progress: number
    limit: number
}

export default function ProgressBar({ className = '', progress, limit }: Props) {
    return (
        <div className="flex items-center gap-4 w-full">
            <Link href="/teachers">
                <IoChevronBack size={32} className="text-primary-900 duration-300 hover:-translate-x-1" />
            </Link>

            {/* PROGRESS BAR */}
            <div className={`${className} flex items-center gap-1 w-full h-7 md:text-base rounded-full bg-primary-200`}>
                <div
                    className={`flex items-center justify-center h-7 font-bold text-white rounded-full bg-primary-900 duration-300`}
                    style={{
                        width: `calc((100% * ${progress} / ${limit}))`
                    }}
                >
                    <span className="hidden sm:block">{progress} / {limit}</span>
                </div>
                <span className="sm:hidden text-xs font-bold text-primary-900">{progress} / {limit}</span>

                {progress == 0 && (
                    <div className="flex items-center justify-center w-full h-7 font-bold text-primary-900">
                        <span>{progress} / {limit}</span>
                    </div>
                )}
            </div>
        </div>
    )
}