'use client';

import MobileTeachersInfo from "../components/teachers/MobileTeachersInfo";
import TeacherCards from "../components/teachers/TeacherCards";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";
import EmptyIcon from "../components/icons/EmptyIcon";

export default function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const { data: session } = useSession();
    const [studentId, setStudentId] = useState();
    const [evaluated, setEvaluated] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchTeachers = async () => {
        const res = await fetch(`/api/student/${session?.user?.id}`);

        if (res.status == 200) {
            const resJson = await res.json();
            const studentId = resJson.id;
            setStudentId(studentId);
            setEvaluated(resJson.evaluation);
            const schoolWorkers = resJson.Course.map(course => ({
                school_worker: course.school_worker,
                subject: course.subject
            }));
            setTeachers(schoolWorkers);
        } else {
            toast.error('Error al procesar su petición');
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (session?.user) {
            fetchTeachers();
        }
    }, [session?.user]);

    return (
        <>
            <Toaster theme="light" richColors visibleToasts={1} position="top-center" />
            { !isLoading &&
            (<div className="flex flex-col lg:flex-row w-full">
                <MobileTeachersInfo className="block lg:hidden" />
                {teachers.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6 sm:gap-8 w-full p-8">
                        {teachers.map(teacher => (

                            <TeacherCards 
                                key={teacher.id} 
                                teacher={teacher.school_worker} 
                                subject={teacher.subject} 
                                studentId={studentId}
                                evaluated={
                                    evaluated.some(evaluation => 
                                        evaluation.id_school_worker === teacher.school_worker.id 
                                        && evaluation.id_subject === teacher.subject.id)
                                }
                            />
                        ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-screen w-full">
                            <EmptyIcon />
                            <span className="text-center text-xl mt-4">No hay profesores asignados</span>
                        </div>
                    )}
                </div>)}
        </>
    )
}