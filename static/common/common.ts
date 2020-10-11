import qs from 'qs';
import md5 from 'js-md5';
import { sha256 } from 'js-sha256';

// interface Star {
//   [key: string]: any;
// }

// const hostname = window.location.hostname;
// const dotPos = hostname.indexOf('.');
// const cookieDomain = dotPos > 0 ? hostname.substr(dotPos) : '';
const hostname = 'window.location.hostname';
const dotPos = hostname.indexOf('.');
const cookieDomain = dotPos > 0 ? hostname.substr(dotPos) : '';
const docCookies = {
  getItem: function (sKey: string) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || '';
  },
  setItem: function (sKey: string, sValue: string, vEnd: any) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (cookieDomain ? '; domain=' + cookieDomain : '') + '; path=/';
    return true;
  },
  removeItem: function (sKey: string) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (cookieDomain ? '; domain=' + cookieDomain : '') + '; path=/';
    return true;
  },
  hasItem: function (sKey: string) {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};

export default {
  getSign: (data: any) => {
    let empty = '';
    Object.keys(data).sort().forEach((key) => {
      empty += `${key}${data[key]}`;
    });
    return md5(`${empty}jiaoyisuo@2017`);
  },
  // 去除数组中的空值
  trimSpace: (array: any) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === '' || typeof (array[i]) === 'undefined') {
        array.splice(i, 1);
        i = i - 1;

      }
    }
    return array;
  },
  getPass: (data: any) => {
    const salt = '6jBafRANsu89avX4eGvnR9m7y9XNJZx28gCG9v6k9Dea4xyryQ';
    return sha256(data + salt);
  },
  setCookie: (name: string, value: string, hour?: number): void => {
    if (hour) {
      const oDate = hour ? (Number(hour) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000);
      const date = new Date();
      date.setTime(date.getTime() + oDate);
      docCookies.setItem(name, value, date);
    } else {
      docCookies.setItem(name, value, false);
    }
  },
  getCookie: (name: string) => {
    return docCookies.getItem(name);
  },
  removeCookie: function (name: string) {
    docCookies.removeItem(name);
  },
  formatDateTimeTwo: (inputTime: any) => {
    const date = new Date(inputTime);
    const y = date.getFullYear();
    let m: string = (date.getMonth() + 1).toString();
    m = Number(m) < 10 ? ('0' + m) : m;
    let d = date.getDate().toString();
    d = Number(d) < 10 ? ('0' + d) : d;
    let h = date.getHours().toString();
    h = Number(h) < 10 ? ('0' + h) : h;
    let minute = date.getMinutes().toString();
    let second = date.getSeconds().toString();
    minute = Number(minute) < 10 ? ('0' + minute) : minute;
    second = Number(second) < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + '   ' + h + ':' + minute + ':' + second;
  },
  formatDateTimeThree: (inputTime: any) => {
    const date = new Date(inputTime);
    const y = date.getFullYear();
    const m: string = dataSua((date.getMonth() + 1)).toString();
    // m = Number(m) < 10 ? ('0' + m) : m;
    const d = dataSua(date.getDate()).toString();

    function dataSua(dTime: number) {
      return dTime < 10 ? '0' + dTime : dTime;
    }

    return y + '/' + m + '/' + d;
  },
  getPostParams: (obj: any) => {
    return qs.stringify(obj);
  },
  resetEmail: (val: string) => {
    if (val) {
      return val.replace(/(.{2}).+(@.+)/g, '$1****$2');
    }
  },

  resetPhone: (val: string) => {
    let empty = '';
    if (val) {
      empty = val.slice(0, 3) + '****' + val.slice(-4);
    }
    return empty;
  },

  /**
   * 操作localstorage
   * @param {string} type 传递 set, get, remove
   * @param {string} key
   * @param value
   * @returns {any}
   */
  handleLocalStorage: (type: string, key: string, value?: any) => {
    const str = JSON.stringify(value);
    if (type === 'set') {
      window.localStorage.setItem(key, str);
    }
    if (type === 'get') {
      const data: any = window.localStorage.getItem(key);
      return JSON.parse(data);
    }
    if (type === 'remove') {
      window.localStorage.removeItem(key);
    }
  },

  /*
   * 多语言路由设置
   */
  pathLanguage() {
    const lang: string = this.getCookie('USERLANG');
    const relateLang: any = {
      'en': '',
      'zh': '/cn',
      'ko': '/kr'
    };
    return relateLang[lang] || '';
  },

  browserLangApi(broLan: string) {
    let browserLang = '';
    if (broLan === 'zh') {
      browserLang = 'zh';
    } else if (broLan === 'ko') {
      browserLang = 'ko';
    } else {
      browserLang = 'en';
    }
    return browserLang;
  },
  setCookieLanguage(str: string) {
    if (str.indexOf('/cn') !== -1) {
      return 'zh';
    } else if (str.indexOf('/kr') !== -1) {
      return 'ko';
    } else {
      return 'en';
    }
  },
  otcUrlHost() {
    const location = window.location;
    if (process.env.NODE_ENV === 'development') {
      return location.protocol + '//' + (process.env.VUE_APP_OTC_HOST || '');
    } else {
      const hostName: string = location.hostname;
      return location.protocol + '//' +
        hostName.replace(hostName.split('.')[0], 'otc') +
        (location.port ? ':' + location.port : '');
    }
  }
};
