import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getInfo } from '../../../store/actionCreators'

function ReduxThunkCom (props) {
  useEffect(() => {
    props.getInfo()
  }, [])

  return (
    <div>
      <hr />
      <h1>redux-thunk</h1>
      <h3>{props.info.age}</h3>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    info: state.info
  }  
}

const mapDispatchToProps = dispatch => {
  return {
    getInfo() {
      // 使用 redux-thunk 之后，是传入一个函数
      dispatch(getInfo)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxThunkCom)