'use client';

import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
    className?: string
    progress: number
    limit: number
}

export default function ProgressBar({ className = '', progress, limit }: Props) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(progress / limit);
    }, [progress]);

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
                        width: `calc((100% * ${width}))`
                    }}
                >
                    <span className={width < 0.2 ? 'hidden' : 'block'}>{progress} / {limit}</span>
                </div>
                <span className={`${width < 0.2 ? 'block' : 'hidden'} ${width == 0 ? 'hidden' : ''} text-xs font-bold text-primary-900`}>{progress} / {limit}</span>

                {progress == 0 && (
                    <div className="flex items-center justify-center w-full h-7 font-bold text-primary-900">
                        <span>{progress} / {limit}</span>
                    </div>
                )}
            </div>
        </div>
    )
}