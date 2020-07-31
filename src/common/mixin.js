import { debounce } from "common/utils";
// 定义一个混入对象
// 组件中的 option 都可以写入混入，当出现同名选项的时候，会进行合并
export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null,
            newRefresh: null
        }
    },
    mounted() {
        // 监听商品 item 中图片加载完成
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
        // 对监听事件进行保存
        this.itemImageListener = () => {
            this.newRefresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImageListener);
    }
}
import BackTop from "components/content/backTop/BackTop";
import { BACK_POSITION } from "common/const";
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        btnClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        listenShowBackTop(position) {
            //  判断BackTop是否显示
            this.isShowBackTop = -position.y > BACK_POSITION;
        }
    }
}