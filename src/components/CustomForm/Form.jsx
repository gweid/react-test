import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {}
    }
  }


  submitForm = (cb) => {
    cb({ ...this.state.formData })
  }

  resetForm = () => {
    const newFormDate = {}

    Object.keys(this.state.formData).forEach(key => {
      newFormDate[key] = ''
    })

    this.setState({
      formData: newFormDate
    })
  }

  setFormValue = (name, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    })
  }

  render() {
    const { children } = this.props
    const renderChildren = []

    React.Children.forEach(children, (child) => {
      const { name } = child.props

      if(child.type.displayName === 'FormItem') {
        const ChildrenEle = React.cloneElement(child, {
          key: name,
          handleChange: this.setFormValue,
          value: this.state.formData[name] || ''
        })

        renderChildren.push(ChildrenEle)
      }
    })

    return renderChildren
  }
}

Form.displayName = 'Form'

export default Form
