import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'


class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName='active'
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = ['drawer']

    if (!this.props.isOpen) {
      cls.push('close')
    }

    const links = []

    if (this.props.isAuthenticated && this.props.role == 'admin') {
      links.push({to: '/', label: 'Список тестов', exact: true})
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
      links.push({to: '/list-users', label: 'Пользователи', exact: false})
      links.push({to: '/results', label: 'Результаты', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false})
    } else if (this.props.isAuthenticated && this.props.role != 'admin') {
      links.push({to: '/', label: 'Пройти тесты', exact: true})
      links.push({to: '/results', label: 'Результаты', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false})
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null }
      </React.Fragment>
    )
  }
}

export default Drawer