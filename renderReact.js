
import App from './src/App.js';

module.exports = function(app) {
    app.get('*', (req, res) => {
        const html = renderToString(
          <App/>
        );
        res.render(path.join(__dirname, 'src/index.pug'), {
          app: html
        });
    });
}