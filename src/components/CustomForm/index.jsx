import React from 'react'

import Form from "./Form"
import FormItem from "./FormItem"
import Input from './Input'

const CustomForm = () => {
  const form = React.useRef(null)

  const submit = () => {
    /* 表单提交 */
    form.current.submitForm((formValue) => {
      console.log(formValue)
    })
  }

  const reset = () => {
    /* 表单重置 */
    form.current.resetForm()
  }

  return (
    <div className='box' >
      <h1>-------------------------- 自定义 Form --------------------------</h1>
      <Form ref={form} >
        <FormItem name="name" label="我是"  >
          <Input />
        </FormItem>
        <FormItem name="mes" label="我想对大家说"  >
          <Input />
        </FormItem>
        <Input placeholder="不需要的input" />
        <Input />
      </Form>
      <div className="btns" >
        <button className="searchbtn" onClick={submit} >提交</button>
        <button className="concellbtn" onClick={reset} >重置</button>
      </div>
    </div>
  )
}

export default CustomForm
