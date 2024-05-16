import { NextResponse } from "next/server"
import db from "@/app/libs/db"

// GET ALL SCHOOLWORLERS FROM DATABASE
export async function GET() {
    try {
        const teachers = await db.schoolWorker.findMany({
            include: {
                user: true
            },
            where: {
                user: {
                    role: 'teacher'
                }
            }
        });

        return NextResponse.json(teachers, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}