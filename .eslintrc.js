module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: ['plugin:vue/strongly-recommended', '@vue/prettier'],

    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-irregular-whitespace': 'off',
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: false,
                },
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'prettier/prettier': [
            'error',
            {
                printWidth: 120,
                tabWidth: 4, // 缩进
                singleQuote: true, // 单引号
                trailingComma: 'all', // 尾部加逗号
                // bracketSpacing: false,
                // jsxBracketSameLine: true
            },
        ],
    },

    parserOptions: {
        parser: 'babel-eslint',
    },
};
