import React, {Component} from 'react'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux';
import Auth from '../../containers/Auth/Auth';

class Layout extends Component {

  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    if(this.props.isAuthenticated){
      return (
        <div className='layout'>

          <Drawer
            isOpen={this.state.menu}
            onClose={this.menuCloseHandler}
            isAuthenticated={this.props.isAuthenticated}
            role={this.props.role}
          />

          <MenuToggle
            onToggle={this.toggleMenuHandler}
            isOpen={this.state.menu}
          />

          <main>
            { this.props.children }
          </main>
        </div>
      )
    } else {
      return(
        <Auth />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    role: state.auth.role
  }
}

export default connect(mapStateToProps)(Layout)