import React, { PureComponent, createRef } from 'react';

export default class ModelCom extends PureComponent {
  constructor(props) {
    super();

    this.hobbitRef = createRef()

    this.state = {
      name: '',
      fruits: 'orange',
    }
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    console.log(this.state.name);
    e.preventDefault();
  }

  handleFruits(e) {
    this.setState({
      fruits: e.target.value
    });
  }

  handleFruitsSubmit(e) {
    e.preventDefault();
    console.log(this.state.fruits);
  }

  handleHobbit(e) {
    e.preventDefault();
    console.log(this.hobbitRef.current.value);
  }

  render() {
    const { name, fruits } = this.state;
    return (
      <div>
        <h3>====================受控组件=====================</h3>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="name">
            <input 
              id="name"
              type="text"
              onChange={e => this.handleName(e)}
              value={name}
            />
          </label>
          <input type="submit" value="提交"/>
        </form>
        <form onSubmit={e => this.handleFruitsSubmit(e)}>
          <label>
            <select value={fruits} onChange={e => this.handleFruits(e)}>
              <option value="apple">苹果</option>
              <option value="banana">香蕉</option>
              <option value="orange">橙子</option>
            </select>
          </label>
          <input type="submit" value="确定" />
        </form>
        <h3>====================非受控组件=====================</h3>
        <form onSubmit={e => this.handleHobbit(e)}>
          <label>
            兴趣：
            <input type="text" defaultValue="ball" ref={this.hobbitRef} />
          </label>
          <input type="submit" value="提交" />
        </form>
      </div>
    );
  }
}