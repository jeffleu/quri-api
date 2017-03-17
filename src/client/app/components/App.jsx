import React, { Component } from 'react';
import InputUPC from './InputUPC';
import List from './List';
import {
  blankState,
  updateErrorMessage,
  updateImportMessage,
  containsAlpha,
  isIncorrectLength
} from '../utils';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUPC: '',
      inputError: false,
      data: { list: [] },
      errorMessage: '',
      importMessage: ''
    };

    this.updateUPC = this.updateUPC.bind(this);
    this.addUPC = this.addUPC.bind(this);
    this.postUPCs = this.postUPCs.bind(this);
    this.clear = this.clear.bind(this);
  }

  updateUPC(upc) {
    if (containsAlpha(upc)) {
      this.setState({
        currentUPC: upc,
        inputError: true,
        errorMessage: 'Numeric values only.'
      });
    } else if (isIncorrectLength(upc)) {
      this.setState({
        currentUPC: upc,
        inputError: true,
        errorMessage: 'UPC must be a length of 12.'
      });
    } else {
      this.setState({
        currentUPC: upc,
        inputError: false,
        errorMessage: ''
      });
    }
  }

  addUPC() {
    axios.post('/validate', { upc: this.state.currentUPC })
      .then(response => {
        if (response.data.hasOwnProperty('error')) {
          if (response.data.hasOwnProperty('suggestion')) {
            this.setState(updateErrorMessage(`${response.data.message} (Did you mean ${response.data.suggestion}?)`));
          } else {
            this.setState(updateErrorMessage(response.data.message));
          }
        } else {
          if (response.data.code !== 'OK') {
            this.setState(updateErrorMessage(response.data.message));
          } else {
            this.setState({
              currentUPC: '',
              inputError: false,
              data: { list: [...this.state.data.list, this.state.currentUPC] },
              errorMessage: '',
              importMessage: ''
            });
          }
        }
      })
      .catch(updateErrorMessage('Error reaching API endpoint.'));
  }

  postUPCs() {
    const { list } = this.state.data;
    if (list.length) {
      axios.post('/import', { list })
        .then(response => this.setState(updateImportMessage('Successfully imported UPCs!')))
        .catch(error => this.setState(updateImportMessage('Error importing UPCs...')));
    } else {
      this.setState(updateImportMessage('Can\'t import empty UPC list.'));
    }
  }
  
  clear() {
    this.setState(blankState);
  }
  
  render() {
    return (
      <div className="main">
        <InputUPC
          currentUPC={this.state.currentUPC}
          inputError={this.state.inputError}
          updateUPC={this.updateUPC}
          addUPC={this.addUPC}
          postUPCs={this.postUPCs}
          clear={this.clear}
          errorMessage={this.state.errorMessage}
          importMessage={this.state.importMessage}
          />
        <List upcs={this.state.data.list}/>
      </div>
    );
  }
}
