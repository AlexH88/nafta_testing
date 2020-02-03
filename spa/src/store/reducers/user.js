import {
	FETCH_USERS_START,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	SET_CURRENT_PAGE,
	SET_TOTAL_COUNT_USERS
} from '../actions/actionTypes'

const initialState = {
	users: [],
	loading: false,
	error: null,
	pageSize: 5,
	totalCount: 0,
	currentPage: 1
}

export default function userReducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_USERS_START:
			return {
				...state, loading: true
			}
		case FETCH_USERS_SUCCESS:
			return {
				...state, loading: false, users: action.users
			}
		case FETCH_USERS_ERROR:
			return {
				...state, loading: false, error: action.error
			}
		case SET_CURRENT_PAGE:
			return {
				...state, currentPage: action.currentPage
			}
		case SET_TOTAL_COUNT_USERS:
			return {
				...state, totalCount: action.totalCount
			}
		default:
			return state
	}
}