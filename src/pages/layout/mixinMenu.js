/**
 * Created by henian.xu on 2018/7/19.
 *
 */

import { createNamespacedHelpers } from 'vuex';

const {
    mapState: menuMapState,
    mapGetters: menuMapGetters,
    mapMutations: menuMapMutations,
    mapActions: menuMapActions,
} = createNamespacedHelpers('global/menu');

export default {
    computed: {
        ...menuMapState({
            stateData: 'data',
            headerIndex: 'headerIndex',
            asideIndex: 'asideIndex',
        }),
        ...menuMapGetters(['menuData', 'asideData', 'menuUrlMap']),
    },
    methods: {
        ...menuMapMutations(['setHeaderIndex', 'setAsideIndex']),
        ...menuMapActions(['getMenuData']),
    },
};
