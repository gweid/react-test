import React, { Component } from "react";

class FormItem extends Component {

  onChange = (value) => {
    const { name, handleChange } = this.props

    handleChange(name, value)
  }

  render() {
    const { children, label, value } = this.props

    return (
      <div className='form'>
        <span className='label'>{label}：</span>
        {
          (React.isValidElement(children) && children.type.displayName === 'Input')
            ? React.cloneElement(children, {
              onChange: this.onChange,
              value
            })
            : null
        }
      </div>
    )
  }
}

FormItem.displayName = 'FormItem'

export default FormItem
