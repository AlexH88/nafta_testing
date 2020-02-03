import React, {Component} from 'react'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchUsers, setCurrentPage} from '../../store/actions/user'
import Pagination from '../../components/Pagination/Pagination'

class UsersList extends Component {

	renderUsers() {
		return this.props.users.map((user, index) => {
			return(
				<div className='user__list-item' key={index}>
					<div className='avatar'>
						<img src="https://accounts.tsu.ru/Content/noAvatar.jpg" />
					</div>
					<div className='description'>
						<span>{user.name}</span>
						<span>{user.surname}</span>
					</div>
				</div>
			)
		})
	}

	componentDidMount() {
		this.props.fetchUsers(this.props.currentPage, this.props.pageSize)
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)
		this.props.fetchUsers(pageNumber, this.props.pageSize)
	}

	render() {

		let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize)
		let page = []
		for(let i = 1; i <= pagesCount; i++) {
			page.push(i)
		}

		return(
			<div className='container'>
				<h1>Список зарегистрированных пользователей</h1>
				{
					this.props.loading && this.props.users.length !== 0
					? <Loader />
					: <React.Fragment>
						  <div className='user__list'>
							{this.renderUsers()}
						  </div>
						  <Pagination page={page} currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}/>
					  </React.Fragment>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    users: state.user.users,
    loading: state.user.loading,
	pageSize: state.user.pageSize,
	totalCount: state.user.totalCount,
	currentPage: state.user.currentPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: (currentPage, pageSize) => dispatch(fetchUsers(currentPage, pageSize)),
    setCurrentPage: (pageNumber) => dispatch(setCurrentPage(pageNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)