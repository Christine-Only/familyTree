import React, { Component } from 'react'

import { judgeDataType, throwError } from '../utils/utils'
import { familyTreeObj, animationTime } from './constant'
import './FamilyTree.css'

class FamilyTree extends Component {
  state = {}

  get familyDom() {
    switch (judgeDataType(familyTreeObj)) {
      case 'Object':
        return this.handleDataToDom(familyTreeObj)
      case 'Array':
        return (
          familyTreeObj.length === 0
            ? throwError('数据为空，请检查')
            : familyTreeObj.map((item, index) => this.handleDataToDom(item, index))
        )
      default:
        return throwError('数据格式错误，请检查')
    }
  }

  // 获取当前identity元素上的动画className
  getIdentityAnimationCls = (identity) => {
    if (!(identity in this.state)) {
      return ''
    }
    return this.state[identity].preFadeOut ? 'fadeOut' : 'fadeIn'
  }

  // 递归处理当前数据结构获取对应的dom结构
  handleDataToDom = (data, flexScale = 1, keyIndex = 0) => {
    const { identity, extend } = data
    const style = { flex: `${flexScale} 1` }
    const displayExtend = !(identity in this.state) || this.state[identity].display
    const animationCls = this.getIdentityAnimationCls(identity)
    // 当前角色不存在后代
    if (!extend || extend.length === 0) {
      return (
        <div
          key={`${identity}_${keyIndex}`}
          className='identity noExtend'
          style={style}
          onClick={() => this.handleIdentityOperate(identity)}
        >
          {identity}
        </div>
      )
    }
    // 存在后代
    return (
      <div key={`${identity}_${keyIndex}`} className='blockWrapper' style={style}>
        <div className='identity' onClick={() => this.handleIdentityOperate(identity)}>
          {`${identity}${displayExtend ? '' : '...'}`}
        </div>
        {displayExtend && this.handleExtendDom(extend, animationCls)}
      </div>
    )
  }

  // 处理identity的显示/隐藏操作
  handleIdentityOperate = (identity) => {
    const changeDisplayState = () => {
      this.setState({ [identity]: { ...this.state[identity], display: !this.state[identity].display } })
    }
    const changePreFadeOutState = () => {
      this.setState({ [identity]: { ...this.state[identity], preFadeOut: !this.state[identity].preFadeOut } })
    }
    if (identity in this.state) {
      if (!this.state[identity].display) {
        changeDisplayState()
        return
      }
      changePreFadeOutState()
      setTimeout(() => {
        changePreFadeOutState()
        changeDisplayState()
      }, animationTime * 1000);
      return
    }
    alert(`${identity}还没有孩子哦`)
  }

  // 处理后代数据生成dom结构
  handleExtendDom = (extendData, animationCls = '') => {
    return (
      <div className={`flex ${animationCls}`}>
        {extendData.map((item, index) => {
          const { extend } = item
          const flexScale = extend ? extend.length : 1
          return this.handleDataToDom(item, flexScale, index)
        })}
      </div>
    )
  }

  // 从identity对象中提取包含后代数据的identity
  pickUpExtendKey = (identityObj) => {
    const { identity, extend } = identityObj
    if (!extend || extend.length === 0) {
      return
    }
    this.setState({ [identity]: { display: true, preFadeOut: false } })
    this.handleDataToStore(extend)
  }

  // 提取数据中存在后代的数据到状态
  handleDataToStore = (data) => {
    switch (judgeDataType(data)) {
      case 'Object':
        this.pickUpExtendKey(data)
        break;
      case 'Array':
        data.forEach(item => this.pickUpExtendKey(item))
        break;
      default:
        return throwError('数据格式错误，请检查')
    }
  }

  componentDidMount() {
    this.handleDataToStore(familyTreeObj)
  }

  render() {
    console.log(this.state)
    return (
      <div className='familyTree'>
        {this.familyDom}
      </div>
    )
  }
}

export default FamilyTree