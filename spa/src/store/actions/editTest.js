import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from './actionTypes'
import axios from '../../axios/axios-quiz'
import {fetchQuizes} from './quiz'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finishCreateQuiz(theme) {
  return async (dispatch, getState) => {
    const res = await axios.post('http://localhost:3001/api/test', {'theme': theme, test: getState().editTest.quiz})
    if(res.status === 200){
      dispatch(resetQuizCreation())
    }
  }
}

export function deleteQuiz(id) {
  return async (dispatch) => {
    const res = await axios.delete(`http://localhost:3001/api/test/${id}`)

    if(res.status === 200){
      dispatch(fetchQuizes())
    }
  }
}