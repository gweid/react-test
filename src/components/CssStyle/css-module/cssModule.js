import React, { PureComponent } from 'react'
import styleCss from './cssModule.module.css'

export default class CssModule extends PureComponent {
  render() {
    return (
      <div>
        <h1 className={styleCss.title}>css Module</h1>
        {/* 如果是连接符 - 形式，需要使用这种 */}
        <h2 className={styleCss['title-sub']}>title-sub</h2>
      </div>
    )
  }
}
