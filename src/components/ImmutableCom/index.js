import React, { Component } from 'react'

class ImmutableCom extends Component {
  constructor(props) {
    super();

    this.state = {
      dataList: [
        { id: '1', name: 'jack', age: 20 },
        { id: '2', name: 'mark', age: 21 },
        { id: '3', name: 'lucy', age: 22 }
      ]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.dataList !== this.state.dataList;
  }

  addPeople() {
    let id = String(+this.state.dataList[this.state.dataList.length-1].id + 1);
    // this.state.dataList.push({id: id, name: `people${id}`, age: 20 + +id});
    // this.setState({
    //   dataList: this.state.dataList
    // })

    const newData = [...this.state.dataList, {id: id, name: `people${id}`, age: 20 + +id}];
    this.setState({
      dataList: newData
    })
  }

  addAge(index) {
    const newList = [...this.state.dataList];
    newList[index].age += 1;
    this.setState({
      dataList: newList
    });
  }

  render() {
    return (
      <div>
        {
          this.state.dataList.map((item, index) => (
            <div key={item.id}>
              姓名：<span>{item.name}</span> ==== 
              年龄：<span>{item.age}</span> ====
              <button onClick={e => this.addAge(index)}>+1</button>
            </div>
          ))
        }
        <button onClick={e => this.addPeople()}>添加一个</button>
      </div>
    );
  }
}

export default ImmutableCom;