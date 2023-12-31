module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['prettier', 'eslint-plugin-import'],
  rules: {
    // *** Preettier ***
    'prettier/prettier': 'error',
    'no-unused-expressions': 0,
    // 'max-len' : ['error', { code: 100 }],
    // *** Types and References ***
    'react/jsx-max-props-per-line': [1, { maximum: 1 }],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit'
      }
    ],
    '@typescript-eslint/indent': ['error', 2, {
      'ignoredNodes': ['TemplateLiteral'],
      'SwitchCase': 1
    }],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    // '@typescript-eslint/member-ordering': 'error',
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     format: ['camelCase', 'UPPER_CASE'],
    //     leadingUnderscore: 'allow'
    //   }
    // ],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    'react-hooks/rules-of-hooks': 'warn',
    '@typescript-eslint/quotes': [
      'warn',
      'single',
      {
        avoidEscape: true
      }
    ],
    '@typescript-eslint/semi': ['warn', 'never'],
    '@typescript-eslint/type-annotation-spacing': 'warn',
    'brace-style': ['error', '1tbs'],
    curly: 'off',
    'default-case': 'error',
    'eol-last': 'off',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      'undefined'
    ],
    'id-match': 'error',
    // 'jsdoc/check-alignment': 'error',
    // 'jsdoc/check-indentation': 'error',
    // 'jsdoc/newline-after-description': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'log',
          'warn',
          'error',
          'dir',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupCollapsed',
          'groupEnd',
          'Console',
          'dirxml',
          'table',
          'markTimeline',
          'profile',
          'profileEnd',
          'timeline',
          'timelineEnd',
          'timeStamp',
          'context'
        ]
      }
    ],
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new-wrappers': 'error',
    'no-null/no-null': 'off',
    'no-redeclare': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    'no-trailing-spaces': 'error',
    // 'no-trailing-comma': 'error',
    // 'no-underscore-dangle': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    radix: 'error',
    'comma-dangle': ['warn', 'never'],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/']
      }
    ],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal'],
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'external',
            'position': 'before'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }
    ]
  }
}
