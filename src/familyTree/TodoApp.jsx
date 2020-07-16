import React, { Component } from 'react'

import './TodoApp.css'


function FamilyTree(props) {
  const { family, handleDataToDom } = props
  return <div className="table-container">
    {family.map((item, index) => {
      return handleDataToDom(item, index)
    })}
  </div>
}
class TodoApp extends Component {
  state = {
    "爷爷": { display: true, fade: true },
    "爸爸": { display: true, fade: true },
    "叔叔": { display: true, fade: true },
    "我": { display: true, fade: true }
  }

  dataSource = [
    {
      name: '爷爷',
      children: [
        {
          name: '叔叔',
          children: [{name: '堂姐'}, {name: '堂弟'}]
        },
        {
          name: '爸爸',
          children: [
            {
              name: '我',
              children: [{name:'儿子'}, { name: '女儿' }]
            },
            { name: '哥哥' },
            { name: '妹妹' }
          ]
        }
      ]
    }
  ]

  handleDataToDom = ( data, flexScale = 1, keyIndex = 0 ) => {
    const { name, children } = data
    const style = { flex: `${flexScale} 1` }
    const showExtend = this.state[name] && this.state[name].display
    const animationCls = this.state[name] && (this.state[name].fade ? 'fadeIn' : 'fadeOut')
    if (!children || children.length === 0) {
      return (
        <div
          key={`${name}_${keyIndex}`}
          className="name noExtend"
          style={style}
          onClick={() => this.handleDisplayOperate(name)}
        >
          {name}
        </div>
      )
    }
    return (
      <div
        key={`${name}_${keyIndex}`}
        className="box"
        style={style}
      >
        <div
          className="name"
          onClick={() => this.handleDisplayOperate(name)}
        >
          {name}
        </div>
        {showExtend &&
          <div
            className={`flex ${animationCls}`}
          >
          {children.map((item, index) => {
            const { children } = item
            const flexScale = children ? children.length : 1
            return this.handleDataToDom(item, flexScale, index)
          })}
          </div>
        }
      </div>
    )
  }

  handleDisplayOperate = name => {
    const changeDisplay = () => {
      this.setState({
        [name]: { ...this.setState[name], display: !this.state[name].display }
      })
    }

    const changeFade = () => {
      this.setState({
        [name]: { ...this.state[name], fade: !this.state[name].fade }
      })
    }
    if (name in this.state) {
      if (!this.state[name].display) {
        changeDisplay()
      }
      changeFade()
      setTimeout(() => {
        changeDisplay()
        changeFade()
      }, 400);
      return
    }
    alert(`${name}节点没有孩子哦~`)
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