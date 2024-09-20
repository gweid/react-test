import React, { memo, PureComponent } from "react";

// const RenderSon = (props) => {

//   console.log('子组件渲染了');

//   return (
//     <div>
//       <p>RenderSon</p>
//       <p>{props.title}</p>
//     </div>
//   )
// }


// 子组件继承自 PureComponent
class RenderSon extends PureComponent {
  constructor() {
    super()

    this.state = {
      name: 'son',
      attr: {
        sex: 1
      }
    }
  }

  handleAttr = () => {
    const { attr } = this.state
    attr.sex = 2
    this.setState({ attr })
  }

  render() {
    console.log('子组件重新渲染了')

    return (
      <div>
        <p>-------------------- 子组件 --------------------</p>
        <p>{this.props.title}</p>
        <button onClick={() => this.setState({ name: 'son' })}>state相同</button>
        <button onClick={() => this.setState({ name: 'sonsub' })}>state不同</button>
        <button onClick={this.handleAttr}>引用数据类型</button>
      </div>
    )
  }
}

export default RenderSon
// export default memo(RenderSon)
