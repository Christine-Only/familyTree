// 判断数据类型，返回String/Array/Object/Function/Null/Undefined
export const judgeDataType = (data) => {
  const type = Object.prototype.toString.call(data)
  return type.replace(/\[|\]/g, '').split(' ')[1]
}

export const throwError = (str) => {
  throw new Error(str)
}