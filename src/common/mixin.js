import { debounce } from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

// 混入
export const ItemListenerMixin = {
    data() {
        return {
            ItemimgLoadListen: null,
            newrefresh: null,
            themeTopLY: [],
        }
    },
    components: {},
    methods: {},
    mounted() {
        // // 1.图片加载完成的事件监听
        this.newrefresh = debounce(this.$refs.bscroll.refresh, 50);

        // // 2.抽离刷新函数
        this.ItemimgLoadListen = () => {
                this.$refs.bscroll && this.newrefresh();
                // this.$refs.bscroll.refresh();
                // console.log(this.$refs.bscroll.refresh);
            }
            // // 3.全局监听
        this.$bus.$on('ItemimgLoad', this.ItemimgLoadListen);

        // console.log('混入');
    }
}

export const BackTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBacTop: false,
        }
    },
    methods: {
        //显示与隐藏
        listenBacktopShow(position) {
            this.isShowBacTop = (-position.y) > 1000;
        },
        //返回顶部
        goBack() {
            this.$refs.bscroll.ScrollTo(0, 0);
        }
    },

}