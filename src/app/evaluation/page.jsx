'use client';

import ProgressBar from "../components/evaluation/ProgressBar";
import ButtonOption from "../components/evaluation/ButtonOption";
import React, { useState, useEffect, useContext } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";
import { EvaluationContext } from "../components/evaluation/EvaluationContext";

const options = [
    { emoji: '😁', description: 'Totalmente de acuerdo', points: 5 },
    { emoji: '🙂', description: 'De acuerdo', points: 4 },
    { emoji: '😐', description: 'Neutral', points: 3 },
    { emoji: '😣', description: 'En desacuerdo', points: 2 },
    { emoji: '😡', description: 'Totalmente en desacuerdo', points: 1 },
];

export default function Evaluation() {
    const [selectedIndex, setSelectedIndex] = useState();
    const [disabled, setDisabled] = useState(false);
    const [progress, setProgress] = useState({ progress: 0, limit: 0 });
    const [questions, setQuestions] = useState([{text: 'Cargando preguntas...', value: 0}]);
    const [question, setQuestion] = useState([{text:questions[0].text, value:questions[0].value}]);
    const [evaluation, setEvaluation] = useState([{text:'', id:"", points: 0}]);
    const navigation = useRouter();
    const [scope, animate] = useAnimate();
    const { teacherId, studentId, subjectId, setTeacherId, setStudentId, setSubjectId } = useContext(EvaluationContext);

    useEffect(() => {
        if (teacherId && studentId && teacherId !== "" && studentId !== "") {
            localStorage.setItem('teacherId', teacherId);
            localStorage.setItem('studentId', studentId);
            localStorage.setItem('subjectId', subjectId);
            fetchQuestions();
        }
    }, [teacherId, studentId, subjectId]);

    useEffect(() => {
        const savedTeacherId = localStorage.getItem('teacherId');
        const savedStudentId = localStorage.getItem('studentId');
        const savedSubjectId = localStorage.getItem('subjectId');
        if (savedTeacherId && savedStudentId) {
            setTeacherId(savedTeacherId);
            setStudentId(savedStudentId);
            setSubjectId(savedSubjectId);
        }
    }, []);

    // Change the question that it shows (change the state):
    const changeQuestion = async (selectedIndex) => {
        console.log(progress.progress, progress.limit - 1, progress.progress <= progress.limit - 1)
        if (progress.progress <= progress.limit - 1) {
            await animate(scope.current, { opacity: 0 }, { duration: 0.5, ease: 'easeInOut' });
            await animate(scope.current, { y: 60 })
            setEvaluation([ ...evaluation, {text: question.text, id:question.value, points: options[selectedIndex].points}])
            setQuestion(questions[progress.progress + 1]);
            await animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, ease: 'easeInOut' });
        }
    }

    useEffect(() => {
        if (questions.length > 0) {
          setQuestion(questions[0]);
        }
      }, [questions]);
      

    const fetchQuestions = async () => {
        const response = await fetch('/api/questions');
        const data = await response.json();
        const formattedData = data.map((item, index) => ({
            text: `${index + 1}. ${item.question}`,
            value: item.id
        }));
        setQuestions(formattedData);
        setProgress({ progress: 0, limit: formattedData.length });
    }

    const fetchEvaluation = async () => {
        const average_points = evaluation.reduce((acc, item) => acc + item.points, 0) / evaluation.length;
        // Convert the evaluation array to a JSON object, excluding the first element
        const evaluationJson = evaluation.slice(1).reduce((acc, item) => {
            return {
                ...acc,
                [item.id]: item.points,
            };
        }, {});

        const response = await fetch('/api/evaluation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_school_worker: teacherId,
                id_student: studentId,
                id_subject: subjectId,
                average: average_points,
                evaluation: JSON.stringify(evaluationJson)
            })
        });

        const data = await response.json();

        if (data.error) {
            toast.error("Error al enviar la evaluación");
        } else {
            toast.success('¡Evaluación enviada con éxito!');
        }   
    }

    // Manage the onClick button:
    const nextQuestion = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        if (progress.progress == progress.limit) {
            fetchEvaluation();
            navigation.push('/teachers');
            
        } else {
            if (selectedIndex != null) {
                changeQuestion(selectedIndex);

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
        if (question.text && progress.progress == progress.limit) {
            setDisabled(true);
            toast.info('¡Evaluación finalizada!');
        }
    }, [progress, questions]);

    return (
        <>
            <Toaster theme="light" richColors={true} visibleToasts={1} position="top-center" />
            <div className="flex flex-col gap-8 w-full p-8">
                <ProgressBar progress={progress.progress} limit={progress.limit} />

                <p
                    ref={scope}
                    className="
                        px-0 py-4 text-center text-xl font-bold min-h-[200px]
                        md:px-4 md:py-8 md:text-2xl
                        lg:py-8 lg:text-3xl
                        2xl:py-12
                    "
                >{progress.progress < progress.limit && question.text || '...'}</p>

                <div className="flex flex-col items-center gap-4 w-full h-full ">
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