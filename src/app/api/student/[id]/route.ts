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
                                evaluation: true,
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

        if(!student) {
            return NextResponse.json({error: "Error", message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(student, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({error: "Error", message: error.message }, { status: 500 });
    }
}