import axios from 'axios'
import {
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	FETCH_USERS_START,
	SET_CURRENT_PAGE,
	SET_TOTAL_COUNT_USERS
} from './actionTypes'

export function fetchUsers(currentPage, pageSize) {
	return async dispatch => {
		dispatch(fetchUsersStart())
		try {
			const response = await axios.get(`http://localhost:3001/api/users?page=${currentPage}&perPage=${pageSize}`)
			dispatch(fetchUsersSuccess(response.data.docs))
			dispatch(setTotalCountUsers(response.data.total))
		} catch (e) {
			dispatch(fetchUsersError(e))
		}
	}
}

export function fetchUsersStart() {
	return {
		type: FETCH_USERS_START
	}
}

export function fetchUsersSuccess(users) {
	return {
		type: FETCH_USERS_SUCCESS,
		users
	}
}

export function fetchUsersError(e) {
	return {
		type: FETCH_USERS_ERROR,
		error: e
	}
}

export function setCurrentPage(currentPage) {
	return {
		type: SET_CURRENT_PAGE,
		currentPage
	}
}

export function setTotalCountUsers(totalCount) {
	return {
		type: SET_TOTAL_COUNT_USERS,
		totalCount
	}
}