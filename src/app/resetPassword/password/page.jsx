import db from "../../libs/db"
import ResetPasswordForm from "../../components/email/ResetPasswordForm";
import SendEmailForm from "../../components/email/SendEmailForm";
import InvalidToken from "@/app/components/email/InvalidToken";

export default async function PasswordPage({ searchParams }) {
    if (searchParams.token) {
        const user = await db.user.findUnique({
            where: {
                resetPasswordToken: searchParams.token
            }
        });

        if (!user) {
            return (
                <InvalidToken />
            )
        }

        return (
            <ResetPasswordForm
                resetPasswordToken={user.resetPasswordToken}
                oldPassword={user.password}
            />
        )
    } else {
        // return <SendEmailForm />
        return <InvalidToken />
    }
}
