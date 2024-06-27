import { toast } from "sonner";

export const fetchCycle = async () => {
    const res = await fetch('api/timeFrame');

    if (res.status == 200) {
        const resJson = await res.json();

        if (resJson.activePhase.tipo == "REALIZACION_EVALUACION") {
            const dateString = resJson.activePhase.fechaFin;
            const newDate = new Date(dateString);

            return {
                day: (newDate.getDate()).toString().padStart(2, '0'),
                month: (newDate.getMonth() + 1).toString().padStart(2, '0'),
                year: newDate.getFullYear(),
                isActive: true
            }
        }
    } else {
        //toast.error('Error al obtener la fecha de evaluación');
    }

    return {
        day: '',
        month: '',
        year: 0,
        isActive: false
    }
}
