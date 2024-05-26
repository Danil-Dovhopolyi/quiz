import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, AppDispatch } from '../../store/store'
import { fetchQuizzes, deleteQuiz } from '../../store/features/QuizSlice'
import AddQuizForm from '../../components/AddQuizForm/AddQuizForm'

const QuizList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const quizzes = useSelector((state: RootState) => state.quiz.quizzes)
    const quizStatus = useSelector((state: RootState) => state.quiz.status)
    const error = useSelector((state: RootState) => state.quiz.error)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quizToEdit, setQuizToEdit] = useState(null)

    useEffect(() => {
        if (quizStatus === 'idle') {
            dispatch(fetchQuizzes())
        }
    }, [quizStatus, dispatch])

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setQuizToEdit(null)
    }

    const handleDeleteQuiz = (id: number) => {
        dispatch(deleteQuiz(id))
    }

    const handleEditQuiz = (quiz: any) => {
        setQuizToEdit(quiz)
        setIsModalOpen(true)
    }

    let content

    if (quizStatus === 'loading') {
        content = <div className="text-center text-lg">Loading...</div>
    } else if (quizStatus === 'succeeded') {
        content = (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                {quizzes.map((quiz: any) => (
                    <div
                        key={quiz.id}
                        className="bg-white rounded-lg shadow-md p-6 relative"
                    >
                        <Link to={`/quiz/${quiz.id}`}>
                            <h2 className="text-2xl font-semibold mb-2">
                                {quiz.name}
                            </h2>
                            <p className="text-gray-700">{quiz.description}</p>
                        </Link>
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                                onClick={() => handleEditQuiz(quiz)}
                                className="text-blue-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteQuiz(quiz.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    } else if (quizStatus === 'failed') {
        content = (
            <div className="text-center text-lg text-red-600">{error}</div>
        )
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center my-8">Quiz List</h1>
            <button
                onClick={handleOpenModal}
                className="mb-4 p-2 bg-blue-500 text-white rounded"
            >
                Add New Quiz
            </button>
            {content}
            {isModalOpen && (
                <AddQuizForm
                    onClose={handleCloseModal}
                    quizToEdit={quizToEdit}
                />
            )}
        </div>
    )
}

export default QuizList
