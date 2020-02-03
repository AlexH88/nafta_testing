import {combineReducers} from 'redux'
import quizReducer from './quiz'
import editReducer from './editTest'
import authReducer from './auth'
import userReducer from './user'
import resultTestReducer from './resultsTest'

export default combineReducers({
	quiz: quizReducer,
	editTest: editReducer,
	auth: authReducer,
	user: userReducer,
	results: resultTestReducer
})