const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment('production');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('dist/js')
    // public path used by the web server to access the output path
    .setPublicPath('/')
    // only needed for CDN's or sub-directory deploy
    .setManifestKeyPrefix('./js')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('content_script', './src/content_script.ts')

    .enableSingleRuntimeChunk()
    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

    .copyFiles({
        from: './public/',
        to: '../[path][name].[ext]'
    })

    .enableTypeScriptLoader()

;

module.exports = Encore.getWebpackConfig();
