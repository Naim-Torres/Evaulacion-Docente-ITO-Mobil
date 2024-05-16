'use client';

import NavBar from '@components/NavBar';
import TeachersSideBar from './TeachersSideBar';
import { usePathname } from 'next/navigation';

interface Props {
    className?: string
}

export default function SideBar({ className = '' }: Props) {
    const pathname = usePathname();

    return (
        <section className={`${className} fixed w-4/12 h-screen xl:w-5/12 bg-primary-900`}>
            <NavBar />

            {pathname == '/teachers' && (
                <TeachersSideBar />
            )}
        </section>
    )
}