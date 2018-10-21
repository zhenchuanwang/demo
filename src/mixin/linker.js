/**
 * Created by henian.xu on 2018/6/25.
 * 超链接混合器
 */

const urlReg = new RegExp(/[a-zA-z]+:\/\/[^\s]*/);

export default {
    props: {
        to: {
            type: [String, Object],
            default: '',
            // required: true,
        },
        tag: {
            type: String,
            default: 'a',
        },
        exact: Boolean,
        append: Boolean,
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        event: {
            type: [String, Array],
            default: 'click',
        },
        disabled: Boolean,
    },
    computed: {
        isUrl() {
            return urlReg.test(this.to);
        },
        linkerProps() {
            const { to, tag, exact, append, replace, activeClass, exactActiveClass, event, disabled } = this;
            if (!to || disabled) {
                return {};
            } else if (this.isUrl) {
                return {
                    is: 'a',
                    href: to,
                };
            } else {
                return {
                    is: 'router-link',
                    to,
                    tag,
                    exact,
                    append,
                    replace,
                    activeClass,
                    exactActiveClass,
                    event,
                };
            }
        },
    },
};
