'use client';

import ProgressBar from "../components/evaluation/ProgressBar";
import ButtonOption from "../components/evaluation/ButtonOption";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const options = [
    { emoji: '😁', description: 'Totalmente de acuerdo', points: 5 },
    { emoji: '🙂', description: 'De acuerdo', points: 4 },
    { emoji: '😐', description: 'Neutral', points: 3 },
    { emoji: '😣', description: 'En desacuerdo', points: 2 },
    { emoji: '😡', description: 'Totalmente en desacuerdo', points: 1 },
];

const questions = [
    "1. Al inicio del semestre, ¿El profesor te brinda el programa de estudios de la materia?",
    "2. Al inicio del semestre, ¿El profesor te brinda el programa de estudios de la materia?",
    "3. Al inicio del semestre, ¿El profesor te brinda el programa de estudios de la materia?",
    "4. Al inicio del semestre, ¿El profesor te brinda el programa de estudios de la materia?",
    "5. Al inicio del semestre, ¿El profesor te brinda el programa de estudios de la materia?"
];

export default function Evaluation() {
    const [selectedIndex, setSelectedIndex] = useState();
    const [disabled, setDisabled] = useState(false);
    const [progress, setProgress] = useState({ progress: 0, limit: 5 });
    const [question, setQuestion] = useState(questions[0]);
    const navigation = useRouter();

    // Change the question that it shows (change the state):
    const changeQuestion = () => {
        if (progress.progress < progress.limit - 1) {
            setQuestion(questions[progress.progress + 1]);
        }
    }

    // Manage the onClick button:
    const nextQuestion = () => {
        if (progress.progress == progress.limit) {
            navigation.push('/teachers');
        } else {
            if (selectedIndex != null) {
                changeQuestion();

                setProgress(prevState => {
                    return { ...prevState, progress: prevState.progress + 1 }
                });


                setSelectedIndex(null);
            } else {
                toast.warning('Selecciona una opción antes de continuar');
            }
        }

    }

    // When the evaluation is over, it disable all buttons
    useEffect(() => {
        if (progress.progress == progress.limit) {
            setDisabled(true);
        }
    }, [progress]);

    return (
        <>
            <Toaster theme="light" richColors={true} visibleToasts={1} position="top-center" />
            <div className="flex flex-col gap-8 w-full p-8">
                <ProgressBar progress={progress.progress} limit={progress.limit} />

                <p
                    className="
                        px-0 py-4 text-center text-3xl font-bold
                        md:px-4 md:py-8 md:text-4xl
                        lg:py-8 lg:text-5xl
                        2xl:py-12
                    "
                >{question}</p>

                <div className="flex flex-col items-center gap-4 w-full h-full">
                    {options.map((option, index) => (
                        <ButtonOption
                            key={index}
                            emoji={option.emoji}
                            description={option.description}
                            points={option.points}
                            selectedIndex={selectedIndex}
                            index={index}
                            setSelectedIndex={setSelectedIndex}
                            disabled={disabled}
                            className="
                                w-full
                                md:w-7/12
                            "
                        />
                    ))}

                    <button onClick={nextQuestion} className="text-lg mt-4 bg-primary-900">
                        {progress.progress == progress.limit ? (
                            <p>Finalizar evaluación</p>
                        ) : (
                            <p>Siguiente pregunta</p>
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}