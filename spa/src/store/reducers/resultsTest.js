import {
	FETCH_RESULTS_TEST_START,
	FETCH_RESULTS_TEST_SUCCESS,
	FETCH_RESULTS_TEST_ERROR,
	SET_CURRENT_PAGE_RESULTS,
	SET_TOTAL_COUNT_RESULTS
} from '../actions/actionTypes'

const initialState = {
	result: [],
	loading: false,
	error: null,
	pageSize: 10,
	totalCount: 0,
	currentPage: 1
}

export default function resultTestReducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_RESULTS_TEST_START:
			return {
				...state, loading: true
			}
		case FETCH_RESULTS_TEST_SUCCESS:
			return {
				...state, loading: false, result: action.result
			}
		case FETCH_RESULTS_TEST_ERROR:
			return {
				...state, loading: false, error: action.error
			}
		case SET_CURRENT_PAGE_RESULTS:
			return {
				...state, currentPage: action.currentPage
			}
		case SET_TOTAL_COUNT_RESULTS:
			return {
				...state, totalCount: action.totalCount
			}
		default:
			return state
	}
}