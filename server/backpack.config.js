const path = require('path');

module.exports = {
    webpack: (config, options, webpack) => {
        config.entry.main = path.resolve(__dirname, 'src', 'Main.js');
        config.output.path = path.resolve(__dirname, 'bin');
        config.output.filename = 'build.js';
        config.devtool = 'eval-source-map';
        config.node.__dirname = false;
        config.externals = ['express', 'sqlite3'];
        return config;
    },
};
