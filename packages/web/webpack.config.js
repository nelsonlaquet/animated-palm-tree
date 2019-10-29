const { join } = require("path");
const { EnvironmentPlugin } = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";
const publicPath = isProduction ? "" : "http://localhost:3000/";

module.exports = {
	mode: "development",
	entry: {
		app: ["react-hot-loader/patch", "./src/index.tsx"],
	},
	devtool:
		process.env.NODE_ENV === "production"
			? "none"
			: "cheap-module-eval-source-map",
	output: {
		path: join(__dirname, "bin"),
		publicPath,
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{ loader: "babel-loader" },
					{
						loader: "linaria/loader",
						options: {
							sourceMap: process.env.NODE_ENV !== "production",
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV !== "production",
						},
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: process.env.NODE_ENV !== "production",
						},
					},
				],
			},
			{
				test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
				use: [{ loader: "file-loader" }],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			title: "Rock Paper Scissors Lizard Spock",
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
		new EnvironmentPlugin({
			NODE_ENV: "development",
			RPSLS_ENDPOINT: "",
		}),
	],
	devServer: {
		publicPath,
		contentBase: join(__dirname, "bin"),
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		watchOptions: {
			poll: true,
		},
		host: "0.0.0.0",
		port: "3000",
	},
};
