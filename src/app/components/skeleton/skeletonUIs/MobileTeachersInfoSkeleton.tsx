import Skeleton from "../Skeleton";

export default function MobileTeachersInfoSkeleton() {
    return (
        <div className="flex w-full p-4 sm:p-6 rounded-lg bg-white shadow-md duration-300 hover:shadow-lg">
            {/* FECHA LÍMITE */}
            <div className="flex flex-col justify-end gap-2 w-1/2 border-l-4 border-primary-500 px-4">
                <h3 className="text-sm sm:text-base text-black">Fecha límite</h3>
                <div className="flex gap-2 items-end text-black italic text-sm"><Skeleton variant="block" rounded={8} width={40} height={36} background="rgb(203, 213, 225)" /> día</div>
                <div className="flex gap-2 items-end text-black italic text-sm"><Skeleton variant="block" rounded={8} width={40} height={36} background="rgb(203, 213, 225)" /> mes</div>
                <div className="flex gap-2 items-end text-black italic text-sm"><Skeleton variant="block" rounded={8} width={80} height={36} background="rgb(203, 213, 225)" /> año</div>
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
    )
}