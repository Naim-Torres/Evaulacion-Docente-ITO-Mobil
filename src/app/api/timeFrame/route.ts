import { NextResponse } from "next/server";
import db from "@/app/libs/db";

export async function GET(request: Request) {
    try {
        const now = new Date();

        // Find the active cycle
        const activeCycle = await db.ciclo.findFirst({
            where: {
                estado: 'ACTIVO',
                fechaInicio: {
                    lte: now
                },
                fechaFin: {
                    gte: now
                }
            }
        });

        if (!activeCycle) {
            return NextResponse.json({ message: "No active cycle found" }, { status: 404 });
        }

        // Find the active phase for the active cycle
        const activePhase = activeCycle ? await db.fase.findFirst({
            where: {
                estado: 'ACTIVO',
                fechaInicio: {
                    lte: now
                },
                fechaFin: {
                    gte: now
                },
                cicloId: activeCycle.id
            }
        }) : null;

        if(!activePhase){
            return NextResponse.json({ message: "No active phase found" }, { status: 404 });
        }

        return NextResponse.json({ activeCycle, activePhase }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
