import * as React from 'react';

interface ResetPasswordEmailTemplateProps {
  email: string;
  passwordToken: string;
}

export const ResetPasswordEmailTemplate: React.FC<ResetPasswordEmailTemplateProps> = ({ email, passwordToken }) => {
  return (
    <div>
      <h1>Cambiar contraseña</h1>
      <p>
        Esta recibiendo este correo porque usted (o alguien más) ha solicitado el cambio de contraseña para su cuenta.
      </p>
      <p>
        Por favor haga click en el siguiente enlace, o copie y pegue en su navegador para completar el proceso:
      </p>
      <a href={`${process.env.NEXTAUTH_URL}/reset-password?token=${passwordToken}`}>Cambiar contraseña</a>
      <p>
        Si usted no ha solicitado esto, por favor ignore este correo y su contraseña permanecerá sin cambios.
      </p>
    </div>
  );
};