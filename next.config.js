
const withSass = require('@zeit/next-sass')

module.exports = withSass({
	webpack: (config, { dev }) => {
		config.module.rules.push(
			{
				test: /\.css$/,
				loader: 'babel-loader!raw-loader'
			},
			{
				test: /\.scss$/,
				loader: 'sass-loader'
			},
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'url-loader'
            }
		)
		return config
	},
	devIndicators: {
		autoPrerender: false
	}
})
