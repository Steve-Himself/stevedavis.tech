import React, { Component, PropTypes } from 'react'
import { connect, PromiseState } from 'react-refetch'

class App extends React.Component {
  static childContextTypes = {
    apiPrefix: PropTypes.string.isRequired,
  }

  getChildContext() {
    return {
      apiPrefix: '/api/v1'
    }
  }

  render() {
    return <Profile params={this.props.params} />
  }
}

class Profile extends React.Component {
  static propTypes = {
    userFetch: PropTypes.instanceOf(PromiseState).isRequired,
  }

  static contextTypes = {
    apiPrefix: PropTypes.string.isRequired,
  }

  render() {
    const { userFetch } = this.props

    if (userFetch.pending) {
      return <LoadingAnimation/>
    } else if (userFetch.rejected) {
      return <Error error={userFetch.reason}/>
    } else if (userFetch.fulfilled) {
      return <User data={userFetch.value}/>
    }
  }
}

export default connect((props, context) => {
  return {
    userFetch: `${context.apiPrefix}/user/${props.params.userId}`
  }
})(Profile)