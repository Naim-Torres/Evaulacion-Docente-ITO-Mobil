// Get all questions from the database
import { NextResponse } from "next/server";
import db from "@/app/libs/db";

export async function GET(request: Request) {
	try {
		const questions = await db.questionList.findMany({
            select: {
                question: true,
                id: true,
            },
            where: { active: true },
        }
        );

		if (questions.length === 0) {
			return NextResponse.json(
				{ message: "No questions found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(questions, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}