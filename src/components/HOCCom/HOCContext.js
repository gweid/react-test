import React, { PureComponent, createContext } from 'react';

const MyContext = createContext({title: '标题', right: '默认'});

// function withContext(WrapperCom) {
//   return props => {
//     return (
//       <MyContext.Consumer>
//         {
//           value => <WrapperCom {...props} {...value}/>
//         }
//       </MyContext.Consumer>
//     )
//   }
// }

// 简略代码
function withContext(WrapperCom) {
  return props => (
    <MyContext.Consumer>
      {
        value => <WrapperCom {...props} {...value}/>
      }
    </MyContext.Consumer>
  );
}

// function Header() {
//   return (
//       <MyContext.Consumer>
//         {
//           value => {
//             return (
//               <div>
//                 <h2>{value.title}</h2>
//                 <h3>{value.right}</h3>
//               </div>
//             );
//           }
//         }
//       </MyContext.Consumer>
//   );
// }

function Header(props) {
  const {title, right} = props;
  return (
    <div>
      <h2>{title}</h2>
      <h3>{right}</h3>
    </div>
  );
}

const HeaderContext = withContext(Header);

class HOCContext extends PureComponent {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h4>------------高阶组件共享Context----------</h4>
        <MyContext.Provider value={{title: '我的', right: '点击'}}>
          <HeaderContext />
        </MyContext.Provider>
      </div>
    );
  }
}

export default HOCContext;