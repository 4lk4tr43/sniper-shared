module.exports = {
	env: { node: true },
	extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['prettier', '@typescript-eslint', 'optimize-regex'],
	rules: {
		'prettier/prettier': ['error']
	},
}
