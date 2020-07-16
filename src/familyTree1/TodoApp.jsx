import React, { Component } from 'react'
import './TodoApp.css'

function FamilyTree(props) {
  const { family, handleDataToDom } = props
  return handleDataToDom(family[0], 1, 0)
}

class TodoApp extends Component {

  dataSource = [
    {
      name: "爷爷",
      children: [
        {
          name: "爸爸",
          children: [
            {
              name: "我",
              children: [{ name: "儿子" }, { name: "女儿" }]
            },
            { name: "妹妹" },
            { name: "哥哥" }
          ]
        },
        {
          name: "叔叔",
          children: [{ name: "堂兄" }, { name: "堂妹" }]
        }
      ]
    }
  ]

  state = {
    "爷爷": { display: true, fadeOut: true },
    "爸爸": { display: true, fadeOut: true },
    "叔叔": { display: true, fadeOut: true },
    "我": { display: true, fadeOut: true }
  }

  // 隐藏显示元素
  handleNameOperate = name => {
    const changeDisplayState = () => {
      this.setState({
        [name]: { ...this.state[name], display: !this.state[name].display }
      })
    }
    const changeFadeOut = () => {
      this.setState({
        [name]: { ...this.state[name], fadeOut: !this.state[name].fadeOut }
      })
    }
    if (name in this.state) {
      if (!this.state[name].display) {
        changeDisplayState()
        return
      }
      changeFadeOut()
      setTimeout(() => {
        changeDisplayState()
        changeFadeOut()
      }, 500)
      return
    }
    alert(`${name}节点还没有孩子哦~`)
  }

  handleDataToDom = (data, flexScale = 1, keyIndex = 0) => {
    const { name, children } = data
    const style = { flex: `${flexScale} 1` }
    const displayExtend = this.state[name] && this.state[name].display
    const animationCls = this.state[name] && (this.state[name].fadeOut ? 'fadeOut' : 'fadeIn')
    // 当前角色不存在后代
    if (!children || children.length === 0) {
      return (
        <div
          key={`${name}_${keyIndex}`}
          className='name noExtend'
          style={style}
          onClick={() => this.handleNameOperate(name)}
        >
          {name}
        </div>
      )
    }
    // 存在后代
    return (
      <div
        key={`${name}_${keyIndex}`}
        className='box'
        style={style}
      >
        <div className="name" onClick={() => this.handleNameOperate(name)}>
          {name}
        </div>
        {displayExtend &&
          <div
            className={`flex ${animationCls}`}
          >
            {children.map((item, index) => {
              const { children } = item
              const flexScale = children ? children.length : 1
              return (
                this.handleDataToDom(item, flexScale, index)
              )
            })}
          </div>}
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <FamilyTree family={this.dataSource} handleDataToDom={this.handleDataToDom}/>
      </div>
    )
  }
}


export default TodoApp
