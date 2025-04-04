import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Provider } from "./components/Provider";
import { EvaluationProvider } from "./components/EvaluationProvider";
import "./globals.css";

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: "Evaluación docente por honorarios ITO",
    description: "Aplicación para la evaluación docente por honorarios ITO",
    manifest: "/manifest.webmanifest",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Evaluacion docente por honorarios ITO",
        // startUpImage: [],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={roboto.className}>
                <EvaluationProvider>
                    <Provider>
                        {children}
                    </Provider>
                </EvaluationProvider>
            </body>
        </html>
    );
}
