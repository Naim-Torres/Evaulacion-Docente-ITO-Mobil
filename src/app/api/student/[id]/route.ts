import { NextResponse } from "next/server";
import db from "../../../libs/db";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    try {
        const student = await db.student.findUnique({
            include: {
                Course: {
                    include: {
                        school_worker: {
                            include: {
                                user: true,
                            }
                        },
                        subject: true,
                    }
                },
            },
            where: {
                id_user: params.id
            },
        });

        const time_frame = await db.ciclo.findFirst({
            where: {
                estado: "ACTIVO"
            }
        })

        const evaluation = await db.evaluation.findMany({
            select: {
                id_school_worker: true,
                id_subject: true,
            },
            where: {
                id_student: student?.id,
                createdAt: {
                    gte: time_frame?.fechaInicio,
                    lte: time_frame?.fechaFin
                }
            }
        });

        if (!student) {
            return NextResponse.json({ error: "Error", message: "Student not found" }, { status: 404 });
        }

        (student as any)["evaluation"] = evaluation;

        return NextResponse.json(student, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Error", message: error.message }, { status: 500 });
    }
}