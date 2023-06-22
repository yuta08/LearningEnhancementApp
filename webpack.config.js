const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "https": require.resolve("https-browserify")
    }
  },
  // その他の設定オプションをここに追加できます
};
