// src/features/quiz/quizSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { QuizService } from '../../services/QuizService'

interface Answer {
    id: number
    text: string
    isCorrect: boolean
}

interface Question {
    id: number
    type: string
    text: string
    points: number
    timer: number
    answers: Answer[]
}

interface Quiz {
    id: number
    name: string
    description: string
    questions: Question[]
}

interface QuizState {
    quizzes: Quiz[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: QuizState = {
    quizzes: [],
    status: 'idle',
    error: null,
}

export const fetchQuizzes = createAsyncThunk('quiz/fetchQuizzes', async () => {
    const response = await QuizService.getQuizzes()
    return response
})

export const addNewQuiz = createAsyncThunk(
    'quiz/addNewQuiz',
    async (newQuiz: Quiz) => {
        const response = await QuizService.addQuiz(newQuiz)
        return response
    }
)

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        deleteQuiz: (state, action: PayloadAction<number>) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz.id !== action.payload
            )
        },
        editQuiz: (state, action: PayloadAction<Quiz>) => {
            const index = state.quizzes.findIndex(
                (quiz) => quiz.id === action.payload.id
            )
            if (index !== -1) {
                state.quizzes[index] = action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzes.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchQuizzes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.quizzes = action.payload as Quiz[]
            })
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Something went wrong'
            })
            .addCase(addNewQuiz.fulfilled, (state, action) => {
                state.quizzes.push(action.payload as Quiz)
            })
    },
})

export const { deleteQuiz, editQuiz } = quizSlice.actions
export default quizSlice.reducer
