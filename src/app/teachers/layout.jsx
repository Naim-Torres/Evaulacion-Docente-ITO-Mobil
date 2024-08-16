import SideBar from "@components/SideBar.tsx";
import NavBar from "../components/NavBar";


export default function RootLayout({ children }) {
    return (
        <div
            className="
                flex flex-col w-full min-h-screen h-full
                lg:flex-row
            "
        >
            <NavBar
                className="
                    block
                    lg:hidden
                "
            />

            <SideBar
                className="
                    hidden
                    lg:block
                "
            />
            <main className="w-full lg:absolute lg:w-8/12 xl:w-7/12 lg:right-0">
                {children}
            </main>
        </div>
    );
}
