'use server'

import db from "@/app/libs/db"
import bcrypt from 'bcrypt'


export const changePassword = async (resetPasswordToken: string, newPassword: string) => {
    const user = await db.user.findUnique({
        where: {
            resetPasswordToken
        }
    })

    if (!user) {
        throw new Error('Invalid token')
    }

    const resetPasswordTokenExpires = user.resetPasswordExpires
    if(!resetPasswordTokenExpires){
        throw new Error('Token expired')
    }

    const now = new Date()

    if (now > resetPasswordTokenExpires) {
        throw new Error('Token expired')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const userUpdate = await db.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        }
    })

    //if the update is failed, return an error
    if (!userUpdate) {
        throw new Error('Error updating user')
    }

    return {message: 'Password updated', ok: true}
}