/**
 * Created by henian.xu on 2018/7/23.
 *
 */

import baseMixin from '../base';
import { createNamespacedHelpers } from 'vuex';

const { mapState: mapStateUser, mapGetters: mapGettersUser } = createNamespacedHelpers('user');

export default {
    mixins: [baseMixin],
    computed: {
        ...mapStateUser(['userData']),
        ...mapGettersUser(['account', 'fullName']),
    },
};
