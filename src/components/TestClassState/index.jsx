import React, { PureComponent } from "react"


class TestClassState extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    };
  }

  handleClick = () => {
    this.setState(() => {
      return { num: this.state.num + 1}
    }, () => {
      console.log('state回调函数里面：', this.state.num); // 2
    })

    console.log(this.state.num); // 1
  }

  handleSetTimeutClick = () => {
    setTimeout(() => {
      this.setState({
        num: this.state.num + 1
      })

      console.log(this.state.num); // 2
    })
  }

  handleBindThis() {
    console.log(this.state.num);
  }

  render() {
    return (
      <div>
        <h1>-------------------------------------------------------</h1>
        <div>
          <button onClick={this.handleClick}>setState参数是函数</button>
        </div>
        <div>
          <button onClick={this.handleSetTimeutClick}>setState在setTimeut中</button>
        </div>
        <div>
          <button onClick={this.handleBindThis.bind(this)}>事件绑定this</button>
        </div>
      </div>
    )
  }
}

export default TestClassState
