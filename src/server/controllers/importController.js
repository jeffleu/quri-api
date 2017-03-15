import axios from 'axios';
import { quriApiUrl } from '../../client/app/utils';

export const postToQuri = (req, res) => {
  axios.post(quriApiUrl, req.body)
    .then(result => res.sendStatus(200))
    .catch(error => res.sendStatus(422));
};
