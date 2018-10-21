/**
 * Created by henian.xu on 2018/9/5.
 *
 */

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers('decoration');
export default {
    computed: {
        ...mapState(['decoration', 'decorationJson', 'decorationData', 'controlOffsetTop']),
        ...mapGetters(['decorationMap', 'pageData', 'componentList', 'currentComponent', 'decorationJson']),
    },
    methods: {
        ...mapMutations([
            'setCurrentId',
            'setControlOffsetTop',
            'addComponent',
            'setDecoration',
            'restoreDecorationData',
        ]),
        ...mapActions(['getPageData', 'moveUp', 'moveDown', 'moveDelete', 'savePageData']),
    },
};
