export default function EvaluationSideBar() {
    return (
        <div className="flex flex-col h-full mt-24 p-8 gap-4">
            <h1 className="text-white text-6xl xl:text-8xl font-bold">Evaluación docente</h1>
            <p className="text-white/85 sm:block text-lg">Por favor, sigue las siguientes instrucciones para completar la evaluación docente:</p>
            <ol className="flex flex-col gap-2 list-decimal list-inside text-white/80 mt-4 text-lg">
                <li>Lee cada pregunta cuidadosamente.</li>
                <li>Selecciona la opción que mejor describa tu experiencia. </li>
                <li>Haz clic en el botón "Enviar" para completar la evaluación.</li>
            </ol>
        </div>
    )
}