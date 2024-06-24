'use client';

import db from "../../libs/db"
import ResetPasswordForm from "../../components/email/ResetPasswordForm";
import SendEmailForm from "../../components/email/SendEmailForm";


export default async function PasswordPage({ searchParams }) {
    if (searchParams.token) {
        const user = await db.user.findUnique({
            where: {
                resetPasswordToken: searchParams.token
            }
        });

        if (!user) {
            return (
                <p> El token no es valido</p>
            )
        }

        return (
            <ResetPasswordForm />
        )
    }else {
        return <SendEmailForm />
    }
}
