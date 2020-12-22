import React, { PureComponent } from 'react';

function withAuth(PageCom) {
  return (props) => (props.isOK ? <PageCom /> : <Login />);
}

function Login() {
  return <h2>登陆</h2>;
}

function CardList() {
  return <h2>CardList</h2>;
}

const AuthHoc = withAuth(CardList);

class HOCAuth extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      isOk: true,
    };
  }

  handleLogin = () => {
    this.setState({
      isOk: true,
    });
  };

  handleLogout = () => {
    this.setState({
      isOk: false,
    });
  };

  render() {
    return (
      <div>
        <h4>------------高阶组件鉴权-----------</h4>
        <AuthHoc isOK={this.state.isOk} />
        <button onClick={this.handleLogin}>登进</button>
        <button onClick={this.handleLogout}>退出</button>
      </div>
    );
  }
}

export default HOCAuth;
