import * as React from 'react';

interface ResetPasswordEmailTemplateProps {
    email: string;
}

export const NotifyEvaluationTimeFrame: React.FC<ResetPasswordEmailTemplateProps> = ({ email }) => {
    return (
        <div>
            <h1>El Periodo de Evaluación ha Empezado</h1>
            <p>
                El periodo de evaluación ha comenzado. Por favor inicie sesión en su cuenta para completar la evaluación.
            </p>
            <p>
                Haz click en este enlace para ingresar a la plataforma: <a href={`${process.env.NEXTAUTH_URL}`}>Ingresar</a>
            </p> 
        </div>
    );
};