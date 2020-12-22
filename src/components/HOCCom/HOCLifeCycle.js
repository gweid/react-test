import React, { PureComponent } from 'react';

function withLifeCycle(PageCom) {
  return class extends PureComponent {
    constructor(props) {
      super();
    }

    componentDidMount() {
      console.log('渲染了');
    }

    render() {
      return <PageCom {...this.props} />;
    }
  };
}

class Home extends PureComponent {
  render() {
    return <h3>Home页面</h3>;
  }
}

class Detail extends PureComponent {
  render() {
    return <h3>Detail页面</h3>;
  }
}

const LogHome = withLifeCycle(Home);
const LogDetail = withLifeCycle(Detail);

export default class HOCLifeCycle extends PureComponent {
  render() {
    return (
      <div>
        <h4>----------高阶组件劫持生命周期----------</h4>
        <LogHome />
        <LogDetail />
      </div>
    );
  }
}
