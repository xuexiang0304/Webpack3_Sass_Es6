const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'), // source folder path ->
  JS: path.resolve(__dirname, 'src/js'),
};
devtool: "source-map",
// Webpack configuration
 module.exports = {
  //mode: 'development',
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  // REMOVE BEACUSE OF THE HTML PLUGIN
  // // Now it uses our "src" folder as a starting point
  // devServer: {
  //   contentBase: paths.SRC,
  // },
  module: {
    rules: [
       {
	        test: /\.(js|jsx)$/,
	        exclude: /node_modules/,
	        use: [
	          'babel-loader',
	        ],
       },
       {
            test: /\.css$/,
            use:['style-loader','css-loader']
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(['css-loader','sass-loader'])
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=25000'
        },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
    //  	title: 'React Study',
    //  	// plugin create a temple for you and inject bundled file
    //  	filename: path.join(paths.SRC, 'index.html'),
    //  	//Load a custom template
        template: path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin({filename:'../src/style/css/style.css',
          allChunks: true
      })
  ],
};
