module.exports = {
  devServer: {
    proxy: {
      '^/.netlify/functions': {
        target: 'http://localhost:9000',
      },
    },
  },
};
