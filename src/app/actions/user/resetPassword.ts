'use server';

import prisma from "@/app/libs/db";
import crypto from 'crypto';
import { sendEmail } from "../email/sendEmail";
import { ResetPasswordEmailTemplate } from "@/app/email_template/ResetPasswordEmailTemplate";
import { ReactElement } from "react";

const resetPassword = async ( email : string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const passwordToken = crypto.randomBytes(32).toString('base64url');
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1));

    await prisma.user.update({
        where: {
            id : user.id
        },
        data: {
            resetPasswordToken: passwordToken,
            resetPasswordExpires: expiryDate
        }
    });

    await sendEmail({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Restablecer contraseña',
        react: ResetPasswordEmailTemplate({ email, passwordToken }) as React.ReactElement
    });
}