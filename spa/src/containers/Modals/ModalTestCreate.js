import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux'
import {finishCreateQuiz} from '../../store/actions/editTest';

class ModalTestCreate extends Component {
	state = {
		isFormValid: false,
		formControls: {
			theme: {
				value: '',
				type: 'text',
				label: 'Тема теста',
				errorMessage: 'Введите корректное значение',
				valid: false,
				touched: false,
				validation: {
				required: true,
				minLength: 4
				}
			}
		}
	}

	submitHandler = event => {
		event.preventDefault()
	}

	validateControl(value, validation) {
		if (!validation) {
			return true
		}

		let isValid = true

		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}

		return isValid
	}

	onChangeHandler = (event, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({
			formControls, isFormValid
		})
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={event => this.onChangeHandler(event, controlName)}
				/>
			)
		})
	}

	addHandler = () => {
		this.props.finishCreateQuiz(this.state.formControls.theme.value)
		this.props.clearParentState()
		this.props.onClose()
	}

	renderCurrentQuestions() {
		return(
			this.props.quiz.map((item, index) => {
				return(
					<li key={index}>{item.question}</li>
				)
			})
		)
	}

	render() {
		if(!this.props.show) {
			return null;
		}

		return(
			<div className='backdrop'>
				<div className='modal'>
					<h1>{this.props.title}</h1>

					<ul>
						{this.renderCurrentQuestions()}
					</ul>

					<form onSubmit={this.submitHandler}>
						{ this.renderInputs() }

						<Button
							type="success"
							onClick={this.addHandler}
							disabled={!this.state.isFormValid}
						>
							Добавить
						</Button>


						<Button
							type="primary"
							onClick={this.props.onClose}>
							Закрыть
						</Button>
					</form>
				</div>
			</div>
		)		
	}

}

function mapStateToProps(state) {
	return {
		quiz: state.editTest.quiz,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		finishCreateQuiz: (theme) => dispatch(finishCreateQuiz(theme))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTestCreate)