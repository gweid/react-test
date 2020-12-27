import './index.css'
import React, { PureComponent } from 'react'

import { CSSTransition } from 'react-transition-group';

import { Tabs } from 'antd'
const { TabPane } = Tabs

class CSSAnimat extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      tabKey: '1'
    }
  }
  changeTab = (activeKey) => {
    this.setState({
      tabKey: activeKey
    });
  }
  render() {
    const { tabKey } = this.state;
    return (
      <div className="css-animat">
        <Tabs defaultActiveKey="1" onChange={(activeKey) => this.changeTab(activeKey)}>
          <TabPane tab="Tab 1" key="1">
            <CSSTransition
              in={tabKey === '1'}
              timeout={1000}
              classNames="card"
              onEnter={el => console.log("进入动画前")}
              onEntering={el => console.log("进入动画")}
              onEntered={el => console.log("进入动画后")}
              onExit={el => console.log("退出动画前")}
              onExiting={el => console.log("退出动画")}
              onExited={el => console.log("退出动画后")}
            >
              <div>就安静安静安静安静</div>
            </CSSTransition>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <CSSTransition
              in={tabKey === '2'}
              timeout={1000}
              classNames="card"
            >
              <div>就安静安静安静安静</div>
            </CSSTransition>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default CSSAnimat
