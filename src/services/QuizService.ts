import { mockQuiz } from '../mock/MockQuiz'
export class QuizService {
    static async getQuizzes() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockQuiz)
            }, 1000) // Simulate a network delay
        })
    }

    static async addQuiz(newQuiz: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockQuiz.push(newQuiz)
                resolve(newQuiz)
            }, 1000) // Simulate a network delay
        })
    }

    static async deleteQuiz(quizId: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockQuiz.findIndex((quiz) => quiz.id === quizId)
                if (index !== -1) {
                    mockQuiz.splice(index, 1)
                }
                resolve(quizId)
            }, 1000) // Simulate a network delay
        })
    }

    static async editQuiz(updatedQuiz: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockQuiz.findIndex(
                    (quiz) => quiz.id === updatedQuiz.id
                )
                if (index !== -1) {
                    mockQuiz[index] = updatedQuiz
                }
                resolve(updatedQuiz)
            }, 1000) // Simulate a network delay
        })
    }
}
