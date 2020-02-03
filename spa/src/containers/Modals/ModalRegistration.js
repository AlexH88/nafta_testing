import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import {connect} from 'react-redux'
import {registration} from '../../store/actions/auth'

class ModalRegistration extends Component {

	state = {
		isFormValid: false,
		formControls: {
			name: {
				value: '',
				type: 'text',
				label: 'Имя',
				errorMessage: 'Введите корректное значение',
				valid: false,
				touched: false,
				validation: {
				required: true,
				minLength: 4
				}
			},
			surname: {
				value: '',
				type: 'text',
				label: 'Фамилия',
				errorMessage: 'Введите корректное значение',
				valid: false,
				touched: false,
				validation: {
				required: true,
				minLength: 4
				}
			},
			organization: {
				value: '',
				type: 'text',
				label: 'Организация',
				errorMessage: 'Введите корректное значение',
				valid: false,
				touched: false,
				validation: {
				required: true,
				minLength: 4
				}
			},
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			login: {
				value: '',
				type: 'text',
				label: 'Login',
				errorMessage: 'Введите корректный login',
				valid: false,
				touched: false,
				validation: {
				required: true,
				minLength: 4
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 3
				}
			}
		},
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

		if (validation.login) {
			isValid = value.length >= validation.minLength && isValid
		}

		if (validation.email) {
			isValid = is.email(value) && isValid
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

	loginHandler = () => {
		const user = {
			name: this.state.formControls.name.value,
			surname: this.state.formControls.surname.value,
			organization: this.state.formControls.organization.value,
			email: this.state.formControls.email.value,
			login: this.state.formControls.login.value,
			password: this.state.formControls.password.value
		}
		this.props.registration(user)
	}

    render() {
		if(!this.props.show) {
			return null;
		}

		return(
			<div className='backdrop'>
				<div className='modal'>
					<h1>{this.props.title}</h1>
					<form onSubmit={this.submitHandler}>
						{ this.renderInputs() }

						<Button
							type="success"
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}
							>
							Зарегистрироваться
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

function mapDispatchToProps(dispatch) {
  return {
    registration: (user) => dispatch(registration(user))
  }
}

export default connect(null, mapDispatchToProps)(ModalRegistration)