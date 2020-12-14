import React, { Component, createContext } from 'react';

const MyContext = createContext({title: '标题'});

function FunHead() {
  return (
    <MyContext.Consumer>
      {
        value => {
          return <h1>{value.title}</h1>
        }
      }
    </MyContext.Consumer>
  );
}

class Head extends Component {
  static contextType = MyContext;

  render() {
    return <h1>{this.context.title}</h1>
  }
}

class Top extends Component {
  render() {
    return (
      <div>
        <Head />
        <FunHead />
      </div> 
    );
  }
}

export default class ContextCom extends Component {
  render() {
    return (
      <div>
        <MyContext.Provider value={{title: '首页'}}>
          <Top />
        </MyContext.Provider>
      </div>
    );
  }
}
