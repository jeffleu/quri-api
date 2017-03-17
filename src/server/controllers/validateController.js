import axios from 'axios';
import {
  upcApiUrl,
  containsAlpha,
  isIncorrectLength,
  addCheckDigit,
  addLeadingZeroes,
  lengthError,
  numericError
} from '../../client/app/utils';

export const validateUPC = (req, res) => {
  const upcObj = req.body;
  const { upc } = upcObj;

  const lookup = () => {
    axios.post(upcApiUrl, upcObj)
      .then(result => res.send(result.data))
      .catch(error => res.send(error.response.data));
  };

  const lookupWithZeroes = () => {
    const upcWithZeroes = { upc: addLeadingZeroes(upc) };
    axios.post(upcApiUrl, upcWithZeroes)
      .then(result => res.send(Object.assign({}, lengthError, {suggestion: upcWithZeroes.upc})))
      .catch(error => lookupWithCheckDigit());
  };

  const lookupWithCheckDigit = () => {
    const upcWithCheckDigit = { upc: addCheckDigit(upc) };
    axios.post(upcApiUrl, upcWithCheckDigit)
      .then(result => res.send(Object.assign({}, lengthError, {suggestion: upcWithCheckDigit.upc})))
      .catch(error => res.send(lengthError));
  };

  if (isIncorrectLength(upc)) {
    (!containsAlpha(upc)) ? lookupWithZeroes() : res.send(numericError);
  } else if (containsAlpha(upc)) {
    res.send(numericError);
  } else {
    lookup();
  }
};
