'use client';

import { useState, useEffect } from "react";
import { fetchCycle } from "@/app/teachers/controller";
import MobileTeachersInfoSkeleton from "../skeleton/skeletonUIs/MobileTeachersInfoSkeleton";

interface Props {
    className?: string
}

export default function MobileTeachersInfo({ className = '' }: Props) {
    const [date, setDate] = useState({ day: '', month: '', year: 0, isActive: false });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setDate(await fetchCycle());
            setIsLoading(false);
        }

        fetch();
    }, []);

    return (
        <div className={`${className} flex flex-col justify-center gap-8 h-full p-8 text-white`}>
            <div className="w-[320px]">
                <h1 className="text-black text-4xl sm:text-6xl font-bold">Profesores actuales</h1>
            </div>

            {isLoading ? (
                <MobileTeachersInfoSkeleton />
            ) : (
                <div className="flex w-full p-4 sm:p-6 rounded-lg bg-white shadow-md duration-300 hover:shadow-lg">
                    {/* FECHA LÍMITE */}
                    <div className={`flex flex-col gap-2 w-1/2 border-l-4 ${date.isActive ? 'border-primary-500' : 'border-red-500'} px-4`}>
                        <h3 className="text-sm sm:text-base text-black">Fecha límite</h3>
                        {date.isActive ? (
                            <>
                                <p className="text-black italic text-sm"><span className="not-italic text-3xl text-black font-bold">{date.day}</span> día</p>
                                <p className="text-black italic text-sm"><span className="not-italic text-3xl text-black font-bold">{date.month}</span> mes</p>
                                <p className="text-black italic text-sm"><span className="not-italic text-3xl text-black font-bold">{date.year}</span> año</p>
                            </>
                        ) : (
                            <div>
                                <h3 className="text-black text-xl sm:text-3xl font-bold">La evaluación docente ha finalizado</h3>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6 w-1/2">
                        {/* PROFESORES POR EVALUAR */}
                        <div className="flex flex-col justify-end gap-2 border-l-4 border-primary-500 px-4">
                            <h3 className="text-xs sm:text-base lg:text-lg text-black">Profesores por evaluar</h3>
                            <p className="not-italic text-3xl text-black font-bold">4</p>
                        </div>

                        {/* PROFESORES EVALUADOS */}
                        <div className="flex flex-col justify-end gap-2 border-l-4 border-primary-500 px-4">
                            <h3 className="text-xs sm:text-base lg:text-lg text-black">Profesores evaluados</h3>
                            <p className="not-italic text-3xl text-black font-bold">0</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}