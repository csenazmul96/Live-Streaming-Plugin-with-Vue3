module.exports = {
  css: {
    extract: {
      filename: 'stage61_broadcasting.css',
    },
  },
  configureWebpack: {
    // No need for splitting
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'stage61_broadcasting.js',
    }
  },
}