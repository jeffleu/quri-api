import axios from 'axios';
import { upcApiUrl, isNumeric, isIncorrectLength } from '../../client/app/utils';

export const validateUPC = (req, res) => {
  const upcObj = req.body;
  const { upc } = upcObj;

  if (isIncorrectLength(upc)) {
    res.send({
      error: true,
      message: 'UPC must be a length of 12.'
    });
  } else if (!isNumeric(upc)) {
    res.send({
      error: true,
      message: 'Numeric values only.'
    });
  }

  axios.post(upcApiUrl, upcObj)
    .then(result => res.send(result.data))
    .catch(error => res.send(error.response.data));
};
