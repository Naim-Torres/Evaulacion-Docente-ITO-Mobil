import { NextResponse } from "next/server";
import db from "../../../libs/db";
import bcrypt from 'bcrypt';

interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    try {
        const student = await db.student.findUnique({
            where: {
                id_user: params.id
            },
        });

        if (!student) {
            return NextResponse.json({ error: "Error", message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(student, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Error", message: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await db.user.update({
            where: {
                id: params.id
            },
            data: {
                password: hashedPassword
            }
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        if (error.code == "P2025") {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}