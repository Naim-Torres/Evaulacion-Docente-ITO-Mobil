import { NextResponse } from "next/server";
import db from "@/app/libs/db";
import { sendEmail } from "@/app/actions/email/sendEmail";
import { NotifyEvaluationTimeFrame } from "@/app/email_template/NotifyEvaluationTimeFrameEmail";

export async function GET() {
	try {
		/* const now = new Date();

    const activeCycle = await db.ciclo.findFirst({
        where: {
            estado: "ACTIVO",
            fechaInicio: {
                lte: now,
            },
            fechaFin: {
                gte: now,
            },
        },
    });

    if (!activeCycle) {
        return NextResponse.json(
            { message: "No active cycle found" },
            { status: 404 }
        );
    }

    const activePhase = await db.fase.findFirst({
        where: {
            estado: "ACTIVO",
            cicloId: activeCycle.id,
            tipo: "REALIZACION_EVALUACION",
        },
    });

    if (!activePhase) {
        return NextResponse.json(
            { message: "No active phase found" },
            { status: 404 }
        );
    }

    const startOfDay = (new Date(activePhase.fechaInicio)).setDate((new Date(activePhase.fechaInicio)).getDate() + 1);


    if(new Date(startOfDay).setHours(0,0,0,0) !== now.setHours(0,0,0,0)){
        return NextResponse.json(
            {now, jaime: new Date(startOfDay).setHours(0,0,0,0)},
            { status: 404 }
        );
    } */
		const emails = await db.user.findMany({
			select: {
				email: true,
			},
			where: {
				role: "student",
			},
		});

		const sendedEmail = await sendEmail({
			from: "Acme <onboarding@resend.dev>",
			to: ["19161425@itoaxaca.edu.mx"],
			subject: "Recuerda hacer tu evaluación",
			react: NotifyEvaluationTimeFrame({
				email: "19161425@itoaxaca.edu.mx",
			}) as React.ReactElement,
		});

		return NextResponse.json({ sendedEmail }, { status: 201 });
	} catch (e) {
		return NextResponse.json({ message: e.message }, { status: 500 });
	}
}
