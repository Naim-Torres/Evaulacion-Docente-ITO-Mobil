import NavBar from '@components/NavBar';

interface Props {
    className?: string
}

export default function SideBar({ className = '' }: Props) {
    return (
        <section className={`${className} w-[420px] xl:w-fit bg-primary-900`}>
            <NavBar />

            <div className="flex flex-col justify-center gap-24 h-full p-8 text-white">
                <div
                    className="
                        w-[320px]
                        xl:w-[500px]
                    "
                >
                    <h1
                        className="
                            text-6xl font-bold
                            xl:text-8xl
                        "
                    >Profesores actuales</h1>
                    <p
                        className="
                            hidden text-base text-white/60
                            sm:block
                            xl:text-lg
                        "
                    >Estos son los profesores de honorarios asignados en tu semestre. Por favor realiza cada una de las evaluaciones en tiempo y forma</p>
                </div>

                <div className="flex w-full">
                    {/* FECHA LÍMITE */}
                    <div className="flex flex-col justify-end gap-2 w-1/3 pr-4">
                        <p className="text-white/60 italic text-sm xl:text-base"><span className="not-italic text-4xl xl:text-5xl text-white font-bold">12</span> día</p>
                        <p className="text-white/60 italic text-sm xl:text-base"><span className="not-italic text-4xl xl:text-5xl text-white font-bold">06</span> mes</p>
                        <p className="not-italic text-4xl xl:text-5xl text-white font-bold">2024</p>
                        <h3 className="text-base xl:text-lg text-white/60 pb-6 xl:pb-7">Fecha límite</h3>
                    </div>

                    {/* PROFESORES POR EVALUAR */}
                    <div className="flex flex-col justify-end gap-2 w-1/3 border-x-2 border-white px-4">
                        <p className="not-italic text-4xl xl:text-5xl text-white font-bold">4</p>
                        <h3 className="text-base xl:text-lg text-white/60">Profesores por evaluar</h3>
                    </div>

                    {/* PROFESORES EVALUADOS */}
                    <div className="flex flex-col justify-end gap-2 w-1/3 pl-4">
                        <p className="not-italic text-4xl xl:text-5xl text-white font-bold">0</p>
                        <h3 className="text-base xl:text-lg text-white/60">Profesores evaluados</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}