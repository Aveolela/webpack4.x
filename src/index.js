import './style/style1.css'
import './style/style2.less'

import { sum } from '../utils/math'


// 第三方庫，每次有改動后打包會很耗費時間
import _ from 'lodash'
console.log(_.each)


const res = sum(1, 2);
console.log('sum', res);

console.log('window.ENV', ENV);

// 引入图片

function insertImgElem(imgFile) {
  const img = new Image();
  img.src = imgFile;
  document.body.appendChild(img);
}

import imgFile1 from './img/1.jpg';
import imgFile2 from './img/2.jpg';

insertImgElem(imgFile1);
insertImgElem(imgFile2);

// 引入動態數據 - 懶加載 import(),返回一個 promise
setTimeout(() => {
  // 該語法 webpack 默認支持
  // 定義 chunk
  import('./dynamic-data.js').then(res => {
    console.log(res.default.message)   // 注意這裡的 default
  })
}, 1500);