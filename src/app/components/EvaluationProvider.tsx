'use client'
import React from "react"
import { EvaluationContext } from "./evaluation/EvaluationContext"

export function EvaluationProvider({ children }: { children: React.ReactNode }) {
    const [teacherId, setTeacherId] = React.useState<string>('');
    const [studentId, setStudentId] = React.useState<string>('');

    return (
        <EvaluationContext.Provider value={{ teacherId, studentId, setTeacherId, setStudentId }}>
            {children}
        </EvaluationContext.Provider>
    )
}