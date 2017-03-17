export const quriApiUrl = 'https://iwo3uesa6c.execute-api.us-east-1.amazonaws.com/prod/products';
export const upcApiUrl = 'https://api.upcitemdb.com/prod/trial/lookup';
export const lengthError = { error: true, message: 'UPC must be a length of 12.' };
export const numericError = { error: true, message: 'Numeric values only.' };
export const containsAlpha = upc => /[a-z]/i.test(upc);
export const isCorrectlyFormatted = upc => /^[0-9]{12}$/.test(upc);
export const isIncorrectLength = upc => upc.length !== 12;

export const blankState = {
  currentUPC: '',
  inputError: false,
  data: {list: []},
  errorMessage: '',
  importMessage: ''
};

export const updateErrorMessage = msg => {
  return { errorMessage: msg, importMessage: '' };
};

export const updateImportMessage = msg => {
  return {
    data: { list: [] },
    errorMessage: '',
    importMessage: msg
  };
};

export const addLeadingZeroes = upc => {
  let zeroes = '';
  for (let i = 0; i < (12 - upc.length); i++) zeroes += 0;
  return zeroes + upc;
};

export const addCheckDigit = upc => {
  if (upc.length !== 11) return upc;
  let odd = 0;
  let even = 0;
  for (let i = 0; i < upc.length; i++) {
    (i % 2 === 0) ? odd += Number(upc[i]) : even += Number(upc[i]);
  }
  const mod = (odd * 3 + even) % 10;
  return (mod === 0) ? upc + mod : upc + (10 - mod);
};
