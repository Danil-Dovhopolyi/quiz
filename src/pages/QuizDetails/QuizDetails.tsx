ццimport React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
const QuizDetails: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>()
    const navigate = useNavigate()
    const quiz = useSelector((state: RootState) =>
        state.quiz.quizzes.find((q) => q.id === parseInt(quizId || ''))
    )

    if (!quiz) {
        return (
            <div className="container mx-auto p-4">
                <p>Quiz not found</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    Go back to Quiz List
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{quiz.name}</h1>
            <p className="text-lg mb-4">{quiz.description}</p>
            <div className="bg-white rounded-lg shadow-md p-6">
                {quiz.questions.map((question) => (
                    <div key={question.id} className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            {question.text}
                        </h2>
                        <ul className="list-disc list-inside">
                            {question.answers.map((answer) => (
                                <li key={answer.id} className="text-gray-700">
                                    {answer.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuizDetails
