import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'
import {deleteQuiz} from '../../store/actions/editTest'
import Button from '../../components/UI/Button/Button'

class QuizList extends Component {

  renderQuizes() {
    return this.props.quizes.map(quiz => {
        return (
            <div
              key={`div-${quiz.id}`}
              className='quiz__list-item'
            >
              <NavLink key={quiz.id} to={'/quiz/' + quiz.id}>
                {quiz.name}
              </NavLink>
                {
                  this.props.role == 'admin' 
                  ? <i onClick={()=>{this.props.deleteQuiz(quiz.id)}} key={`${quiz.role-quiz.id}`} className="fa fa-times" aria-hidden="true"></i>
                  : null
                }

            </div>
        )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className='container'>
        <React.Fragment>
          <h1>Список тестов</h1>

          {
            this.props.loading && this.props.quizes.length !== 0
              ? <Loader />
              : <div className='quiz__list'>
                  {this.renderQuizes()}
                </div>
          }

        </React.Fragment>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
    role: state.auth.role

  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
    deleteQuiz: (id) => dispatch(deleteQuiz(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)