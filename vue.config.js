const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
const webpack = require('webpack');
const git_hash = () => {
    const rev = fs.readFileSync('./.git/HEAD').toString().trim().split(/.*[: ]/).slice(-1)[0];
    if (rev.indexOf('/') === -1) {
        return rev;
    } else {
        return fs.readFileSync('./.git/' + rev).toString().trim();
    }
}
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"',
                    GIT_VERSION:git_hash()
                }
            })
        ]
    },
    transpileDependencies: [
        'vuetify'
    ]
}
