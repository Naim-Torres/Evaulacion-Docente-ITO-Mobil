import MobileTeachersInfo from "../components/teachers/MobileTeachersInfo";



export default function page() {
    return (
        <div className="flex flex-col lg:flex-row w-full">
            <MobileTeachersInfo className="block lg:hidden" />

            <div className="grid grid-cols-2 gap-6 sm:gap-8 w-full p-8">
                <div className="group relative overflow-hidden flex items-end h-[320px] md:h-[420px] lg:h-[600px] p-4 md:p-6 rounded-lg bg-white shadow-md cursor-pointer duration-300 hover:shadow-lg">
                    <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-400 to-primary-700 duration-300 group-hover:opacity-0"></div>
                    <div className="z-10 absolute opacity-0 top-0 left-0 w-full h-full bg-gradient-to-r from-primary-300 to-primary-800 duration-300 group-hover:opacity-100"></div>
                    <div className="z-20 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-90% to-black/80"></div>

                    <div className="z-30 flex flex-col duration-300 group-hover:pb-6 group-hover:gap-2">
                        <h3 className="text-white text-lg md:text-xl lg:text-3xl font-semibold">Nombre del profesor</h3>
                        <span className="text-primary-500 text-sm md:text-base lg:text-lg">Materia</span>
                    </div>
                </div>

                <div className="group relative overflow-hidden flex items-end h-[320px] md:h-[420px] lg:h-[600px] p-4 md:p-6 rounded-lg bg-white shadow-md cursor-pointer duration-300 hover:shadow-lg">
                    <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-400 to-primary-700 duration-300 group-hover:opacity-0"></div>
                    <div className="z-10 absolute opacity-0 top-0 left-0 w-full h-full bg-gradient-to-r from-primary-300 to-primary-800 duration-300 group-hover:opacity-100"></div>
                    <div className="z-20 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-90% to-black/80"></div>

                    <div className="z-30 flex flex-col duration-300 group-hover:pb-6 group-hover:gap-2">
                        <h3 className="text-white text-lg md:text-xl lg:text-3xl font-semibold">Nombre del profesor</h3>
                        <span className="text-primary-500 text-sm md:text-base lg:text-lg">Materia</span>
                    </div>
                </div>

                <div className="group relative overflow-hidden flex items-end h-[320px] md:h-[420px] lg:h-[600px] p-4 md:p-6 rounded-lg bg-white shadow-md cursor-pointer duration-300 hover:shadow-lg">
                    <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-400 to-primary-700 duration-300 group-hover:opacity-0"></div>
                    <div className="z-10 absolute opacity-0 top-0 left-0 w-full h-full bg-gradient-to-r from-primary-300 to-primary-800 duration-300 group-hover:opacity-100"></div>
                    <div className="z-20 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-90% to-black/80"></div>

                    <div className="z-30 flex flex-col duration-300 group-hover:pb-6 group-hover:gap-2">
                        <h3 className="text-white text-lg md:text-xl lg:text-3xl font-semibold">Nombre del profesor</h3>
                        <span className="text-primary-500 text-sm md:text-base lg:text-lg">Materia</span>
                    </div>
                </div>

                <div className="group relative overflow-hidden flex items-end h-[320px] md:h-[420px] lg:h-[600px] p-4 md:p-6 rounded-lg bg-white shadow-md cursor-pointer duration-300 hover:shadow-lg">
                    <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-400 to-primary-700 duration-300 group-hover:opacity-0"></div>
                    <div className="z-10 absolute opacity-0 top-0 left-0 w-full h-full bg-gradient-to-r from-primary-300 to-primary-800 duration-300 group-hover:opacity-100"></div>
                    <div className="z-20 absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-90% to-black/80"></div>

                    <div className="z-30 flex flex-col duration-300 group-hover:pb-6 group-hover:gap-2">
                        <h3 className="text-white text-lg md:text-xl lg:text-3xl font-semibold">Nombre del profesor</h3>
                        <span className="text-primary-500 text-sm md:text-base lg:text-lg">Materia</span>
                    </div>
                </div>
            </div>
        </div>
    )
}