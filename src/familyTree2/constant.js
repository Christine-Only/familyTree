export const animationTime = 0.5

export const familyTreeObj = {
  // 爷爷级
  identity: '爷爷',
  extend: [
    // 父亲级
    {
      identity: '爸爸',
      extend: [
        // 同辈级
        {
          identity: '我',
          extend: [
            // 子辈级
            {identity: '儿子'},
            {identity: '女儿'}
          ]
        },
        {identity: '哥哥'},
        {identity: '姐姐'}
      ]
    },
    {
      identity: '叔叔',
      extend: [
        {identity: '堂姐'},
        {identity: '堂弟'}
      ]
    }
  ]
}