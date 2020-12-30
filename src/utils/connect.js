import React, { PureComponent } from 'react'

import { StoreContext } from './context';

const connect = (mapStateToProps, mapDispatchToProps) => {
  return function handleMapCpn(PageCom) {
    return class extends PureComponent {
      static contextType  = StoreContext

      constructor(props, context) {
        super(props, context);
        this.state = {
          storeState: mapStateToProps(context.getState())
        }
      }

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

export default connect;