import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { messagesLoad, messageUpdate } from '../../actions/messages'

import { db } from 'baqend'
import { NativeRouter, Route, Link } from 'react-router-native'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    !this.props.messages.list.length && this.props.actions.messagesLoad({})
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id
    this.setState({ id: id })
  }

  render() {
    if(this.state.id) {
      this.messages = this.props.messages.list.filter(message => message.id.replace('/db/Message/','') === this.state.id)
    } else {
      this.messages = this.props.messages.list
    }
    return (
      <View style={{ paddingTop: 20 }}>
        {this.messages.map(message =>
          <Link key={message.id} to={`/messages/${message.id.replace('/db/Message/','')}`}>
            <View style={styles.message}>
              <View style={styles.row}>
                <Image source={{ uri: db.File(message.face).url }} style={styles.avatar} />
                <Link to={`/messages/${message.id.replace('/db/Message/','')}`}>
                  <Text style={styles.title}>{message.name}</Text>
                </Link>
              </View>
              <Text>{message.text}</Text>
            </View>
          </Link>
        )}
      </View>
    );
  }
}

Messages.propTypes = {
  actions: React.PropTypes.object,
  messages: React.PropTypes.object
}

function mapStateToProps(state) {
  return { messages: state.messages, user: state.user }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ messagesLoad, messageUpdate }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)

const styles = StyleSheet.create({
  message: {
    alignItems: 'center',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#337ab7'
  },
  avatar: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 15
  }
});
