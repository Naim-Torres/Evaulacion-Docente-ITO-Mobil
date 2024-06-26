'use client';
import { useState, useEffect } from "react";
import { fetchCycle } from "../teachers/controller";
import TeacherSideBarSkeleton from "./skeleton/skeletonUIs/TeacherSideBarSkeleton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";


interface Course {
    school_worker: {
        id: string;
        name: string;
        evaluation: any[];
    };
    subject: {
        id: string;
    };
}

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
}

export default function TeachersSideBar() {
    const [date, setDate] = useState({ day: '', month: '', year: 0, isActive: false });
    const [isLoading, setIsLoading] = useState(true);
    const [done, setDone] = useState(0);
    const [notDone, setNotDone] = useState(0);
    const { data: session } = useSession();
    const user = session?.user as User;

    useEffect(() => {
        const fetchData = async () => {
            setDate(await fetchCycle());
            const res = await fetch(`/api/student/${user.id}`);
            if (res.ok) {
                const data = await res.json();
                const evaluated = data.evaluation;
                const schoolWorkers: Course[] = data.Course.map((course: any) => ({
                    school_worker: course.school_worker,
                    subject: course.subject
                }));


                let doneCount = 0;
                let awaitCount = 0;

                schoolWorkers.forEach((schoolWorker: Course) => {
                    const found = evaluated.find((evaluated: any) => 
                        evaluated.id_school_worker === schoolWorker.school_worker.id
                        && evaluated.id_subject === schoolWorker.subject.id);
                    if (found) {
                        doneCount++;
                    } else {
                        awaitCount++;
                    }
                });

                setDone(doneCount);
                setNotDone(awaitCount);

            } else {
                toast.error('Ocurrió un error al cargar los datos');
            }

            setIsLoading(false);
        }
        if (session?.user) {
            fetchData();
        }
    }, [session]);

    return (
        <div className="flex flex-col gap-24 h-full mt-24 p-8 text-white">
            <div className="w-[320px] xl:w-[500px]">
                <h1 className="text-6xl font-bold xl:text-8xl">Profesores actuales</h1>
                <p className="
                            hidden text-base text-white/60
                            sm:block
                            xl:text-lg
                        "
                >Estos son los profesores de honorarios asignados en tu semestre. Por favor realiza cada una de las evaluaciones en tiempo y forma</p>
            </div>

            {isLoading ? (
                <TeacherSideBarSkeleton />
            ) : (
                <div className="flex w-full">
                    {/* FECHA LÍMITE */}
                    <div className="flex flex-col justify-end gap-2 w-1/3 pr-4">
                        {date.isActive ? (
                            <>
                                <p className="text-white/60 italic text-sm xl:text-base"><span className="not-italic text-4xl xl:text-5xl text-white font-bold">{date.day}</span> día</p>
                                <p className="text-white/60 italic text-sm xl:text-base"><span className="not-italic text-4xl xl:text-5xl text-white font-bold">{date.month}</span> mes</p>
                                <p className="not-italic text-4xl xl:text-5xl text-white font-bold">{date.year}</p>
                            </>
                        ) : (
                            <p className="text-red-500 lg:text-lg 2xl:text-4xl font-bold">La evaluación docente ha finalizado</p>
                        )}
                        <h3 className="text-base xl:text-lg text-white/60 pb-6 xl:pb-7 2xl:pb-0">Fecha límite</h3>
                    </div>

                    {/* PROFESORES POR EVALUAR */}
                    <div className="flex flex-col justify-end gap-2 w-1/3 border-x-2 border-white px-4">
                        <p className="not-italic text-4xl xl:text-5xl text-white font-bold">{notDone}</p>
                        <h3 className="text-base xl:text-lg text-white/60">Profesores por evaluar</h3>
                    </div>

                    {/* PROFESORES EVALUADOS */}
                    <div className="flex flex-col justify-end gap-2 w-1/3 pl-4">
                        <p className="not-italic text-4xl xl:text-5xl text-white font-bold">{done}</p>
                        <h3 className="text-base xl:text-lg text-white/60">Profesores evaluados</h3>
                    </div>
                </div>
            )}
        </div>
    )
}