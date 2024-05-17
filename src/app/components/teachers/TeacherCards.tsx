import { Prisma } from "@prisma/client";
import Link from "next/link";

type SchoolWorkerUser = Prisma.SchoolWorkerGetPayload<{
    include: { user: true }
}>

interface Props {
    teacher: SchoolWorkerUser
}

export default function TeacherCards({ teacher }: Props) {
    return (
        <Link href={'/evaluation'} className="group relative overflow-hidden flex items-end h-[300px] sm:h-[360px] md:h-[420px] 2xl:h-[600px] p-4 md:p-6 rounded-lg bg-white shadow-md cursor-pointer duration-300 hover:shadow-lg">
            <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-400 to-primary-700 duration-300"></div>
            <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500 to-primary-700 duration-300 group-hover:opacity-0"></div>
            <div className="z-20 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-90% to-black/80"></div>

            <div className="z-30 flex flex-col gap-0 duration-300 group-hover:pb-6 group-hover:gap-2">
                <h3 className="text-white text-lg md:text-xl lg:text-3xl font-semibold">{teacher.user.name}</h3>
                <span className="text-primary-500 text-sm md:text-base lg:text-lg">Materia</span>
            </div>
        </Link>
    )
}