import CredentialProviders from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "@/app/libs/db";

export const authOptions = {
	providers: [
		GoogleProvider({
			name: "google",
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					name: `${profile.given_name} ${profile.family_name}`,
					email: profile.email,
					image: profile.picture,
					role: profile.role ? profile.role : "user",
				};
			}
		}),
		CredentialProviders({
			name: "Credentials",
			credentials: {
				email: { label: "Correo electrónico", type: "email" },
				password: { label: "Contraseña", type: "password" },
			},
			async authorize(credentials, req) {
				const userFound = await db.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!userFound) throw new Error("Usuario no encontrado");

                if (userFound.role !== "student") throw new Error("Usuario no autorizado");

				const matchPassword = credentials.password === userFound.password;
				if (!matchPassword) throw new Error("Contraseña incorrecta");

				return userFound
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async signIn({ account, profile, user }) {
			if (account.provider === "google") {
				if (!profile?.email) {
					throw new Error("No existe perfil")
				}
				await db.user.upsert({
					where: {
						email: profile.email,
					},
					create: {
						email: profile.email,
						name: profile.name,
						role: user.role,
					},
					update: {
						name: profile.name,
					}
				})
				return true
			}
			if (account.provider === "credentials") {
				return true
			}
			return false
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.role = user.role;
			}
			return token;
		},
		session: async ({ session, token }) => {
			// Add user info to the session
			if (token) {
				session.user = {
					id: token.id,
					email: token.email,
					image: token.picture,
					name: token.name,
					role: token.role,
				};
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},  
};