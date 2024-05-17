import Skeleton from "../Skeleton";

export default function TeacherSideBarSkeleton() {
    return (
        <div className="flex w-full">
            {/* FECHA LÍMITE */}
            <div className="flex flex-col justify-end gap-2 w-1/3 pr-4">
                <div className="flex gap-2 items-end text-white/60 italic text-sm xl:text-base"><Skeleton variant="block" rounded={8} width={40} height={36} background="rgb(241, 245, 249)" /> día</div>
                <div className="flex gap-2 items-end text-white/60 italic text-sm xl:text-base"><Skeleton variant="block" rounded={8} width={40} height={36} background="rgb(241, 245, 249)" /> mes</div>
                <Skeleton variant="block" rounded={8} width={80} height={36} background="rgb(241, 245, 249)" />
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
    )
}