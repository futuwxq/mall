module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, // 视口宽度  对应设计稿 (retina 1点对应 2个像素)
            viewportHeight: 667, // 视口高度 对应设计稿（也可以不配置）
            unitPrecision: 5, // 指定‘px’转换为视窗单位值的最小小数位数（很多时候无法整除）
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['ignore'], // 指定不需要转换的类
            minPixelValue: 1, // 小于或等于1px不转换为视窗单位
            mediaQuery: false, // 允许媒体查询分钟转换px
            // exclude: [/TabBar\.vue$/] // 正则表达式
            // 组件内的插槽不转化
            exclude: [/^TabBar/]
        }
    }
}