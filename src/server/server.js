import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import { importRoute, validateRoute } from './routes';
import config from '../../webpack.config';

const app = express();
const port = 8080;

// Webpack config
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, { path: config.output.path }));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '../client'))); // Render static index route
app.use(bodyParser.json());

// Routes
importRoute(app);
validateRoute(app);

app.listen(port, () => { console.log(`server.js has been served on port: ${port}`); });
