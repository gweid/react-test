import React, { PureComponent } from 'react'
import { createContext } from 'react';

export const StoreContext = createContext();

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return function handleMapCpn(PageCom) {
    return class extends PureComponent {
      // 创建一个 context，那么就可以通过 this.context 访问
      static contextType = StoreContext

      constructor(props, context) {
        super(props, context);
        this.state = {
          storeState: mapStateToProps(context.getState())
        }
      }

      // 为什么需要这一步：
      // 因为直接改变 redux 的数据，这边是不知道数据发生变化的，所以需要这一步来通知数据变化，重新渲染
      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(this.context.getState())
          });
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return (
          // <PageCom
          //   {...this.props}
          //   {...mapStateToProps(store.getState())}
          //   {...mapDispatchToProps(store.dispatch)}
          // />
          <PageCom
            {...this.props}
            {...mapStateToProps(this.context.getState())}
            {...mapDispatchToProps(this.context.dispatch)}
          />
        );
      }
    }
  }
};
