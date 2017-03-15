import { validateUPC } from '../controllers/validateController';

const validateRoute = app => { app.post('/validate', validateUPC) };

export default validateRoute;
