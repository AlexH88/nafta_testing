import axios from 'axios'
import {
	FETCH_RESULTS_TEST_START,
	FETCH_RESULTS_TEST_SUCCESS,
	FETCH_RESULTS_TEST_ERROR,
	SET_CURRENT_PAGE_RESULTS,
	SET_TOTAL_COUNT_RESULTS
} from './actionTypes'

export function fetchResultsTest(currentPage, pageSize) {
	return async dispatch => {
		dispatch(fetchResultsTestStart())
		try {
			const response = await axios.get(`http://localhost:3001/api/results-test?page=${currentPage}&perPage=${pageSize}`)
			dispatch(fetchResultsTestSuccess(response.data.docs))
			dispatch(setTotalCountResultsTest(response.data.total))
		} catch (e) {
			dispatch(fetchResultsTestError(e))
		}
	}
}

export function fetchResultsTestStart() {
	return {
		type: FETCH_RESULTS_TEST_START
	}
}

export function fetchResultsTestSuccess(result) {
	return {
		type: FETCH_RESULTS_TEST_SUCCESS,
		result
	}
}

export function fetchResultsTestError(e) {
	return {
		type: FETCH_RESULTS_TEST_ERROR,
		error: e
	}
}

export function setCurrentPage(currentPage) {
	return {
		type: SET_CURRENT_PAGE_RESULTS,
		currentPage
	}
}

export function setTotalCountResultsTest(totalCount) {
	return {
		type: SET_TOTAL_COUNT_RESULTS,
		totalCount
	}
}