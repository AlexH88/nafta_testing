import React, {Component} from 'react'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchResultsTest, setCurrentPage} from '../../store/actions/resultsTest'
import Pagination from '../../components/Pagination/Pagination'

class ResultsList extends Component {

	componentDidMount() {
		this.props.fetchResultsTest(this.props.currentPage, this.props.pageSize)
	}

	formatData(date) {
		let newdate = new Date(date)
		var dd = newdate.getDate();
		if (dd < 10) dd = '0' + dd;

		var mm = newdate.getMonth() + 1;
		if (mm < 10) mm = '0' + mm;

		var yy = newdate.getFullYear() % 100;
		if (yy < 10) yy = '0' + yy;

		return dd + '.' + mm + '.' + yy;
	}

	renderResult() {
		return this.props.result.map((item, index) => {
			return(
				<tr key={index}>
					<th>{`${item.name} ${item.surname}`}</th>
					<th>
						{this.formatData(item.date)}
					</th>
					<th>{item.assessment}</th>
				</tr>
			)
		})
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)
		this.props.fetchResultsTest(pageNumber, this.props.pageSize)
	}

	render() {

		let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize)
		let page = []
		for(let i = 1; i <= pagesCount; i++) {
			page.push(i)
		}

		return(
			<div className='container'>
				<h1>Результаты тестирования</h1>
				{
					this.props.loading && this.props.result.length !== 0
					? <Loader />
					: <React.Fragment>
						  <div>
						  	<table>
						  		<thead>
									<tr>
										<th>Участник</th>
										<th>Дата теста</th>
										<th>Баллы</th>
									</tr>
						  		</thead>
						  		<tbody>
									{this.renderResult()}
						  		</tbody>
						  	</table>
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
    result: state.results.result,
    loading: state.results.loading,
	pageSize: state.results.pageSize,
	totalCount: state.results.totalCount,
	currentPage: state.results.currentPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchResultsTest: (currentPage, pageSize) => dispatch(fetchResultsTest(currentPage, pageSize)),
    setCurrentPage: (pageNumber) => dispatch(setCurrentPage(pageNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList)
