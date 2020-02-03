import React, {Component} from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'
import ModalRegistration from '../../containers/Modals/ModalRegistration'

class Auth extends Component {

  state = {
    isOpenModal: false,
    isFormValid: false,
    formControls: {
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

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.login.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = () => {
/*
    this.props.auth(
      this.state.formControls.login.value,
      this.state.formControls.password.value,
      false
    )
*/
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

  render() {
    return (
      <React.Fragment>
        <div className='auth'>
          <div>
            <h1>Авторизация</h1>

            <form onSubmit={this.submitHandler}>

              { this.renderInputs() }

              <Button
                type="success"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Войти
              </Button>

              <Button
                type="primary"
                onClick={this.toggleModal}
              >
                  Регистрация
              </Button>
            </form>
          </div>
        </div>

          <ModalRegistration show={this.state.isOpenModal}
            title='Регистрация'
            onClose={this.toggleModal}>
          </ModalRegistration>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (login, password, isLogin) => dispatch(auth(login, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)