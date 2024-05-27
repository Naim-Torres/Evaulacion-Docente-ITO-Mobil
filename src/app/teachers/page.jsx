'use client';

import MobileTeachersInfo from "../components/teachers/MobileTeachersInfo";
import TeacherCards from "../components/teachers/TeacherCards";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const { data: session } = useSession();
    const [studentId, setStudentId] = useState();
    const [evaluated, setEvaluated] = useState();

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
            console.log(res);
        }
    }

    useEffect(() => {
        if (session?.user) {
            fetchTeachers();
        }
    }, [session?.user]);

    return (
        <>
            <Toaster theme="light" richColors visibleToasts={1} position="top-center" />
            <div className="flex flex-col lg:flex-row w-full">
                <MobileTeachersInfo className="block lg:hidden" />

                <div className="grid grid-cols-2 gap-6 sm:gap-8 w-full p-8">
                    {teachers.length > 0 ? (
                        teachers.map(teacher => (

                            console.log(evaluated),
                            console.log(evaluated.some(evaluation => evaluation.id_school_worker === teacher.school_worker.id)),

                            <TeacherCards 
                                key={teacher.id} 
                                teacher={teacher.school_worker} 
                                subject={teacher.subject} 
                                studentId={studentId}
                                evaluated={
                                    evaluated.some(evaluation => evaluation.id_school_worker === teacher.school_worker.id)
                                }
                            />
                        ))
                    ) : (
                        <p>No hay evaluaciones por realizar</p>
                    )}
                </div>
            </div>
        </>
    )
}