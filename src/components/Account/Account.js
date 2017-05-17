import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import { login, register, logout } from '../../actions/auth';

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null
    }
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value })
  }

  handleLogin = (event) => {
    this.props.actions.login(this.state.username, this.state.password)
  }

  handleRegister = (event) => {
    this.props.actions.register(this.state.username, this.state.password)
  }

  handleLogout = (event) => {
    this.props.actions.logout()
  }

  render() {
    return (
      <View>
        {this.props.auth.isLoggedIn ? (
          <View style={{ alignItems: 'center' }}>
            <Text>Hey { this.props.user.username }</Text>
            <Button
              onPress={this.handleLogout}
              title="Logout"
            />
          </View>
        ) : (
          <View>
            <View>
              <Text>Username:</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(username) => this.handleInputChange('username', username)}
                value={this.state.username}
              />
            </View>
            <View>
              <Text>Password:</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.handleInputChange('password', password)}
                value={this.state.password}
              />
            </View>
            <View style={styles.row}>
              <Button
                onPress={this.handleLogin}
                title="Login"
              />
              <Button
                onPress={this.handleRegister}
                title="Register"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

Account.propTypes = {
  user: React.PropTypes.object
}

function mapStateToProps(state) {
  return { auth: state.auth, user: state.auth.user }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ login, register, logout }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Account))

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  }
});
