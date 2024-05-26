import { ComponentType } from 'react'
import QuizList from '../pages/QuizList/QuizList'
import QuizDetails from '../pages/QuizDetails/QuizDetails'

export interface IRoute {
    key: string
    title: string
    path: string
    component: ComponentType
}
const routes: IRoute[] = [
    {
        key: 'QuizList',
        title: 'QuizList',
        path: '/quiz-list',
        component: QuizList,
    },
    {
        key: 'quiz',
        title: 'quiz',
        path: '/quiz-list/:quizId',
        component: QuizDetails,
    },
]

export default routes
