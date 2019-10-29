module.exports = {
	presets: [
		["@babel/preset-env", { modules: false }],
		"@babel/preset-react",
		"@babel/preset-typescript",
		"linaria/babel",
	],
	plugins: ["react-hot-loader/babel"],
};
