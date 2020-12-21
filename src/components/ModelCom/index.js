import React, { PureComponent } from 'react';

export default class ModelCom extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      name: '',
      fruits: 'orange'
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

  render() {
    const { name, fruits } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}