import { postToQuri } from '../controllers/importController';

const importRoute = app => { app.post('/import', postToQuri) };

export default importRoute;
