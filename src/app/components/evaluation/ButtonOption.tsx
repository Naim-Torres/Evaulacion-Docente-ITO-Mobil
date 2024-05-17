interface Props {
    className: string
    emoji: string
    description: string
    points: number
    selectedIndex: number
    index: number
    setSelectedIndex: any
    disabled: boolean
}

export default function ButtonOption({ className, emoji, description, points, selectedIndex, index, setSelectedIndex, disabled }: Props) {
    const onClick = () => {
        setSelectedIndex(index);
    }

    return (
        <button disabled={disabled} onClick={onClick} className={`${className} flex justify-start gap-4 rounded-lg ${disabled ? 'opacity-50' : ''} ${selectedIndex == index ? 'bg-primary-900 shadow-md hover:shadow-lg' : 'bg-primary-200 hover:shadow-md'}`}>
            <p className="text-5xl">{emoji}</p>
            <div className="flex flex-col items-start">
                <span className={`${selectedIndex == index ? 'text-white' : 'text-primary-900'} text-lg md:text-xl duration-300`}>{description}</span>
                <span className="italic font-normal text-primary-500">{points} puntos</span>
            </div>
        </button>
    )
}