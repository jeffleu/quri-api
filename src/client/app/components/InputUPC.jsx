import React from 'react';
import { clearForm } from '../utils';

const InputUPC = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addUPC();
  };
  
  return (
    <div className="input-section">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input type="text" className="form-control" placeholder="Enter UPC"
          value={props.currentUPC}
          onChange={(e) => {props.updateUPC(e.target.value)}}
          />
        <button className="btn btn-primary add-btn">Add</button>
      </form>
      <p className="error-message">{props.errorMessage}</p>
      <div className="buttons">
        <button className="btn btn-success add-btn" onClick={() => props.postUPCs()}>Import UPCs</button>
        <button className="btn btn-danger add-btn" onClick={() => props.clear()}>Clear List</button>
      </div>
      <p className="import-message">{props.importMessage}</p>
    </div>
  );
};

export default InputUPC;
