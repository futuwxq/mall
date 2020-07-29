/**
 * 防抖函数的封装
 * 第一个参数是需要防抖的函数，第二个参数是延迟的时间
 */
export function debounce(func, delay) {
    let timer = null
    return function(...args) {
        // 在 delay 时间未带，就清除上一次的计时器
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }

}

/**
 * 对时间进行格式化 date 是传入的时间戳， fmt 是传入的格式，比如 "yyyy-MM-dd"
 */
export function formatDate(date, fmt) {
    // 1. 获取年份
    // y+ 匹配一个或者多个 y

    if (/(y+)/.test(fmt)) {
        // RegExp.$1 是一个全局对象，它指的是上面式子比配的对象，比如传的 fmt 是"yyyy-MM-dd",RegExp.$1 就是 "yyyy"
        // date.getFullYear() + '' 将数字转化为字符串
        // replace 的第二个参数就是根据传入的年份位数，来获取相应的年份合适
        // 按照传入的年 计算出 4位数的年份
        // 2019 
        // yyyy 2019
        // yyy  019
        // yy  19
        // y   9
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

    }

    let o = {
        // M+ 匹配一个或者多个 M
        //  getMonth 得到的月数是从 0 开始，所以 + 1
        'M+': date.getMonth() + 1,

        'd+': date.getDate(),

        'h+': date.getHours(), // 有的语言区分大小写，h 和 H 代表不一样

        'm+': date.getMinutes(),

        's+': date.getSeconds()

    };

    for (let k in o) {

        if (new RegExp(`(${k})`).test(fmt)) {

            let str = o[k] + '';

            // 如果匹配的 RegExp.$1 是一位，比如 M/d/h ,就不需要 padLeftZero 处理
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));

        }

    }

    return fmt;

};

// 如果 date 是 4:4:4 需要转化为 04:04:04 因此年份和 月、日、时、分、秒的处理不一样
// 比如 str 是 04 ，0004 需要截取前两位 —— 04
function padLeftZero(str) {

    return ('00' + str).substr(str.length);

};