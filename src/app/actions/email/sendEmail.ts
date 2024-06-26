'use server'

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (payload: any, options?: any ) => {
    const data = resend.emails.send(payload, options)

    return data
}
