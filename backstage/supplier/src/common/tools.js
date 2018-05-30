const common = {
  formatDate: function(date, formatType) {
     if (/(y+)/.test(formatType)) {
       formatType = formatType.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
     }
     let times = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
    }
    for (let k in times) {
         if (new RegExp(`(${k})`).test(formatType)) {
             let str = times[k] + ''
           formatType = formatType.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
          }
       }
    return formatType;
   },
 padLeftZero: function(str) {
     return ('00' + str).substr(str.length)
   }
}
export default common;
