import { openApp } from '../../src/index'

// 打开微信
const source = `weixin://dl/scan`
openApp({
  source,
  isApp: true, // 是否在app中
  target: 'http://m.ke.com',
  cb: () => {
    window.alert('打开成功')
  }
})
console.log('object', openApp)