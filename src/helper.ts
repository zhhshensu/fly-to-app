import { OpenAppOptions } from '../types/index'
export function checkOs() {
  const ua = navigator.userAgent.toLowerCase()
  const isAndroid = ua.match(/Android/i) != null
  const isIOS = ua.match(/(iPhone|iPod|iPad|Mac OS)/i) != null
  const isIOS9plus =
    isIOS &&
    ua.indexOf('os 8') == -1 &&
    ua.indexOf('os 7') == -1 &&
    ua.indexOf('os 6') == -1 &&
    ua.indexOf('os 5') == -1
  const qqBrower =
    ua.indexOf('mqqbrowser') > -1 &&
    ua.indexOf('qq/') == -1 &&
    ua.indexOf('micromessenger/') == -1
  return {
    ua,
    isAndroid,
    isIOS,
    isIOS9plus,
    qqBrower,
  }
}

export function openByIframe(baseUrl: string) {
  const ifr = document.createElement('iframe')
  ifr.src = baseUrl
  ifr.style.display = 'none'
  document.body.appendChild(ifr)
  setTimeout(function () {
    document.body.removeChild(ifr)
  }, 2000)
}
export function openByUrl(baseUrl: string) {
  const { isIOS, isIOS9plus } = checkOs()
  if (isIOS) {
    if (isIOS9plus) {
      location.href = baseUrl
    } else {
      openByIframe(baseUrl)
    }
  } else {
    location.href = baseUrl
  }
}
export function openApp(options: OpenAppOptions) {
  const {
    source = '',
    target = '',
    iosBrowserUser,
    androidBrowserUser,
    isApp,
    cb,
  } = options
  return new Promise((resolve, reject) => {
    if (!source) {
      reject('source is required !')
    }
    if (isApp && !target) {
      reject('The page is in app, target is required !')
    }
    const ua = navigator.userAgent.toLowerCase()
    const { isIOS } = checkOs()
    const iosToBrowserUser =
      iosBrowserUser || 'micromessenger,weibo,mailapp,qq/'
    const androidToBrowserUser =
      androidBrowserUser || 'micromessenger,weibo,qq/'
    const isIosToBrower =
      iosToBrowserUser.split(',').filter((l: string) => ua.indexOf(l) > -1)
        .length > 0
    const isAndroidToBrowser =
      androidToBrowserUser.split(',').filter((l) => ua.indexOf(l) > -1).length >
      0
    if (isApp) {
      openByUrl(target)
      // location.href = target
      // 保证跳转完成
      setTimeout(() => {
        resolve('')
      }, 300)
    }
    if (isIOS) {
      if (isIosToBrower) {
        cb && cb(checkOs())
        resolve('')
      }
    } else {
      if (isAndroidToBrowser) {
        cb && cb(checkOs())
        resolve('')
      }
    }
    openByUrl(source)
    // 保证跳转完成
    setTimeout(() => {
      resolve('')
    }, 300)
  })
}
