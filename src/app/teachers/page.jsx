'use client';

import MobileTeachersInfo from "../components/teachers/MobileTeachersInfo";
import TeacherCards from "../components/teachers/TeacherCards";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Teachers() {
    const [teachers, setTeachers] = useState([]);

    const fetchTeachers = async () => {
        const res = await fetch('/api/schoolWorker');

        if (res.status == 200) {
            const resJson = await res.json();
            setTeachers(resJson);
        } else {
            toast.error('Error al procesar su petición');
            console.log(res);
        }
    }

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <>
            <Toaster theme="light" richColors visibleToasts={1} position="top-center" />
            <div className="flex flex-col lg:flex-row w-full">
                <MobileTeachersInfo className="block lg:hidden" />

                <div className="grid grid-cols-2 gap-6 sm:gap-8 w-full p-8">
                    {teachers.map(teacher => (
                        <TeacherCards key={teacher.id} teacher={teacher} />
                    ))}
                </div>
            </div>
        </>
    )
}