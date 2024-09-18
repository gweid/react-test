import React, { Component } from "react";

// AsyncRouter(() => import('../ClassComponent/ClassComponent.js'));

const AsyncRouter = (loadRouter) => {
  return class Content extends Component {
    constructor() {
      super()

      this.state = {
        Component: null
      }
    }
    componentDidMount() {
      loadRouter()
        .then(module => module.default)
        .then(Component => this.setState({ Component }))
    }

    render() {
      const { Component } = this.state

      return (
        Component ? <Component {...this.props} /> : <div>加载中...</div>
      )
    }
  }
}

export default AsyncRouter;
