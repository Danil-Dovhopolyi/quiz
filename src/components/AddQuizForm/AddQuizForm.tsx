import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { addNewQuiz, editQuiz } from '../../store/features/QuizSlice'
interface AddQuizFormProps {
    onClose: () => void
    quizToEdit?: any
}

const AddQuizForm: React.FC<AddQuizFormProps> = ({ onClose, quizToEdit }) => {
    const dispatch: AppDispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [questionText, setQuestionText] = useState('')
    const [answerText, setAnswerText] = useState('')
    const [answers, setAnswers] = useState<
        { text: string; isCorrect: boolean }[]
    >([])
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(() => {
        if (quizToEdit) {
            setName(quizToEdit.name)
            setDescription(quizToEdit.description)
            if (quizToEdit.questions && quizToEdit.questions.length > 0) {
                setQuestionText(quizToEdit.questions[0].text)
                setAnswers([...quizToEdit.questions[0].answers])
            }
        }
    }, [quizToEdit])

    const handleAddAnswer = () => {
        setAnswers([...answers, { text: answerText, isCorrect }])
        setAnswerText('')
        setIsCorrect(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newQuiz = {
            id: quizToEdit ? quizToEdit.id : Date.now(),
            name,
            description,
            questions: [
                {
                    id: Date.now(),
                    type: 'multiple-choice',
                    text: questionText,
                    points: 10,
                    timer: 30,
                    answers: answers.map((a, index) => ({
                        ...a,
                        id: index + 1,
                    })),
                },
            ],
        }

        if (quizToEdit) {
            dispatch(editQuiz(newQuiz))
        } else {
            dispatch(addNewQuiz(newQuiz))
        }
        onClose()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-700"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">
                    {quizToEdit ? 'Edit Quiz' : 'Add New Quiz'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Quiz Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 block w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 block w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Question</label>
                        <input
                            type="text"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            className="mt-1 p-2 block w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Answer</label>
                        <input
                            type="text"
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            className="mt-1 p-2 block w-full border rounded"
                        />
                        <label className="block text-gray-700">
                            <input
                                type="checkbox"
                                checked={isCorrect}
                                onChange={(e) => setIsCorrect(e.target.checked)}
                                className="mr-2"
                            />
                            Is Correct
                        </label>
                        <button
                            type="button"
                            onClick={handleAddAnswer}
                            className="mt-2 p-2 bg-blue-500 text-white rounded"
                        >
                            Add Answer
                        </button>
                    </div>
                    <div className="mb-4">
                        <ul>
                            {answers.map((answer, index) => (
                                <li key={index} className="text-gray-700">
                                    {answer.text} -{' '}
                                    {answer.isCorrect ? 'Correct' : 'Incorrect'}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="mt-2 p-2 bg-green-500 text-white rounded"
                    >
                        {quizToEdit ? 'Edit Quiz' : 'Add Quiz'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddQuizForm
