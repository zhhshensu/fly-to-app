### h5 唤起app

---

``` javascript
import { openApp } from 'fly-to-app'

openApp({
  source: '', // 带scheme地址  例如 lianjialink
  target: '', // 目标地址 例如http://m.ke.com
  iosBrowserUser: '', // 默认值micromessenger,weibo,mailapp,qq/
  androidToBrowserUser: '', // 默认值micromessenger,weibo,qq/
  cb: (os) => {
    console.log(os) //
  },
})

```
