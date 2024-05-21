// Method post for create a new evaluation
import { NextResponse } from "next/server";
import db from "@/app/libs/db";

// Create a new evaluation
export async function POST(request: Request) {
	const data = await request.json();

	try {
		const evaluation = await db.evaluation.create({
			data,
		});
		return NextResponse.json(evaluation, { status: 201 });

	} catch (error: any) {
        if (error.code === 'P2003') {
            return NextResponse.json({error: 'error', message: 'Invalid data' }, { status: 400 });
        }
        console.error(error);
		return NextResponse.json({ error: 'error', message: error.message }, { status: 500 });
	}
}
