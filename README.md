# fly-to-app

浏览器中唤起 App 的

### 线上尝试

- 直接在浏览器中打开 [StackBlitz]('https://stackblitz.com/edit/vitejs-vite-q2zda8?file=README.md') 来尝试使用。

### npm 使用

```bash
npm install @niansu/fly-to-app -S
```

### 通过 CDN 使用

```js
<script src="https://unpkg.com/browse/@niansu/fly-to-app@1.0.6/dist/umd/index.umd.js"></script>
```

所有顶层 API 都以属性的形式暴露在了 FlyToApp 对象上。这里有一个使用全局构建版本的例子：

```js
<script src="https://unpkg.com/browse/@niansu/fly-to-app@1.0.6/dist/umd/index.umd.js"></script>

<script type="module">
   console.log(window.FlyToApp);
   const { openApp } = window.FlyToApp;
   // 打开微信
   const source = `weixin://dl/scan`;
   openApp({
    source,
    isApp: false, // 是否在app中
    target: "http://www.baidu.com",
    cb: () => {
     window.alert("打开成功");
    },
   });
  </script>
```

### 使用 ES 模块构建版本

```javascript
import { openApp } from '@niansu/fly-to-app'
// 打开微信
const source = `weixin://dl/scan`
openApp({
	source, // 带scheme地址
	target: 'http://www.baidu.com', // 目标地址
	iosBrowserUser: '', // 默认值micromessenger,weibo,mailapp,qq/
	androidToBrowserUser: '', // 默认值micromessenger,weibo,qq/
	cb: (os) => {
		console.log(os) //
	},
})
```
