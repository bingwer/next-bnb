module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'spaced-comment': 'off', // 주석을 뒤에 쓸 수 있다.
    'global-require': 'off', // 함수 내에서 require 사용 가능
    'arrow-body-style': 'off', // 화살표 함수 안에 return을 사용할 수 있다.
    'react/no-unescaped-entities': 'off', // 문자열 내에서 " ' > } 허용
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-param-reassign': 'off', //param assign 하지 않기
    'import/no-unresolved': 'off',
    'react/no-array-index-key': 'off', // key값으로 index를 사용할수 있다.
    'react/require-default-props': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off', //export default 권장
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }, //import 시 확장자명은 사용하지 않는다.
    ],
    'jsx-a11y/anchor-is-valid': 'off', // next js 에서는 a태그에 href 없이 사용
    'react/jsx-props-no-spreading': 'off', //props를 스프래드 할 수 있다.
    'no-use-before-define': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
