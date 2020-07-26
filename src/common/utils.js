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