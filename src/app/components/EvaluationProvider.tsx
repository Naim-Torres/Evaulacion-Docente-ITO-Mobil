'use client'
import React from "react"
import { EvaluationContext } from "./evaluation/EvaluationContext"

export function EvaluationProvider({ children }: { children: React.ReactNode }) {
    const [teacherId, setTeacherId] = React.useState<string>('');
    const [studentId, setStudentId] = React.useState<string>('');
    const [subjectId, setSubjectId] = React.useState<string>('');

    return (
        <EvaluationContext.Provider value={{ teacherId, studentId, subjectId ,setTeacherId, setStudentId, setSubjectId }}>
            {children}
        </EvaluationContext.Provider>
    )
}