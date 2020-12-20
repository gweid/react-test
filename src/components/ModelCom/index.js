import React, { PureComponent } from 'react';

export default class ModelCom extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      name: ''
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

  render() {
    const { name } = this.state;
    return (
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
    );
  }
}