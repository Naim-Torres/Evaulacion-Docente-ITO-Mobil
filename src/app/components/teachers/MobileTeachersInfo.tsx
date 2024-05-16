interface Props {
    className?: string
}

export default function MobileTeachersInfo({ className = '' }: Props) {
    return (
        <div className={`${className} flex flex-col justify-center gap-8 h-full p-8 text-white`}>
            <div className="w-[320px]">
                <h1 className="text-black text-6xl font-bold">Profesores actuales</h1>
            </div>

            <div className="flex w-full p-6 rounded-lg bg-white shadow-md duration-300 hover:shadow-lg">
                {/* FECHA LÍMITE */}
                <div className="flex flex-col justify-end gap-2 w-1/2 border-l-4 border-primary-500 px-4">
                    <h3 className="text-sm sm:text-base text-black">Fecha límite</h3>
                    <p className="text-black italic text-sm"><span className="not-italic text-3xl text-black font-bold">12</span> día</p>
                    <p className="text-black italic text-sm"><span className="not-italic text-3xl text-black font-bold">06</span> mes</p>
                    <p className="text-black italic text-sm"><span className="not-italic text-3xl text-black font-bold">2024</span> año</p>
                </div>

                <div className="flex flex-col gap-6 w-1/2">
                    {/* PROFESORES POR EVALUAR */}
                    <div className="flex flex-col justify-end gap-2 border-l-4 border-primary-500 px-4">
                        <h3 className="text-sm sm:text-base lg:text-lg text-black">Profesores por evaluar</h3>
                        <p className="not-italic text-3xl text-black font-bold">4</p>
                    </div>

                    {/* PROFESORES EVALUADOS */}
                    <div className="flex flex-col justify-end gap-2 border-l-4 border-primary-500 px-4">
                        <h3 className="text-sm sm:text-base lg:text-lg text-black">Profesores evaluados</h3>
                        <p className="not-italic text-3xl text-black font-bold">0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}