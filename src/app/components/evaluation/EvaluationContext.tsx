import React from 'react';

interface EvaluationContextProps {
  teacherId: string;
  studentId: string;
  subjectId: string;
  setTeacherId: React.Dispatch<React.SetStateAction<string>>;
  setStudentId: React.Dispatch<React.SetStateAction<string>>;
  setSubjectId: React.Dispatch<React.SetStateAction<string>>;
}

export const EvaluationContext = React.createContext<EvaluationContextProps | undefined>(undefined);