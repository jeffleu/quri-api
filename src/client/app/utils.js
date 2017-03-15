export const quriApiUrl = 'https://iwo3uesa6c.execute-api.us-east-1.amazonaws.com/prod/products';
export const upcApiUrl = 'https://api.upcitemdb.com/prod/trial/lookup';

export const clearForm = () => document.querySelector('.form-inline').reset();
export const isNumeric = upc => /^[0-9]{12}$/.test(upc);
export const isIncorrectLength = upc => upc.length !== 12;
