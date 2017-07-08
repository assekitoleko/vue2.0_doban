// 获取当前时间 yyyy--mm--dd 格式
export function getDateFormat () {
  let d = new Date()
  let year = d.getFullYear() + '-'
  let month = d.getMonth() + 1
  let day = d.getDate()
  month = (month >= 1 && month <= 9) ? '0' + month + '-' : month + '-'
  day = (day >= 1 && day <= 9) ? '0' + day : day
  return year + month + day
}

// 截取字符串前指定字节数
export function cutStr (str, L) {
  let result = ''
  let strlen = str.length // 字符串长度
  let chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度

  if (chrlen <= L) {
    return str
  }

  for (let i = 0, j = 0; i < strlen; i++) {
    let chr = str.charAt(i)
    if (/[\x00-\xff]/.test(chr)) {
      j++ // ascii码为0-255，一个字符就是一个字节的长度
    } else {
      j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
    }
    if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
      result += chr
    } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
      return result
    }
  }
}
