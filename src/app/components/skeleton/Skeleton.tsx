import { ReactNode } from "react"

interface GeneralParams extends Params {
    variant?: 'lineal' | 'block'
}

interface Params {
    className?: string
    rounded?: number
    width?: number | string
    height?: number
    background?: string
}

export const SkeletonLineal = ({ className, rounded = 0, width = '100%', height = 24, background = 'rgb(39, 39, 42)' }: Params) => {
    return (
        <div
            className={`${className} animate-pulse`}
            style={{
                width: width,
                minHeight: height,
                maxHeight: height,
                borderRadius: rounded,
                background: background
            }}
        ></div>
    )
}

export const SkeletonBlock = ({ className, rounded = 0, width = 0, height = 0, background = 'rgb(39, 39, 42)' }: Params) => {
    return (
        <div
            className={`${className} animate-pulse`}
            style={{
                width: width,
                minHeight: height,
                maxHeight: height,
                borderRadius: rounded,
                background: background
            }}
        ></div>
    )
}

export default function Skeleton({ variant = 'lineal', className, rounded, width, height, background }: GeneralParams) {
    const params = { className, rounded, width, height, background };

    return (
        <>
            {variant == 'lineal' && (
                <SkeletonLineal {...params} />
            )}

            {variant == 'block' && (
                <SkeletonBlock {...params} />
            )}
        </>
    )
}