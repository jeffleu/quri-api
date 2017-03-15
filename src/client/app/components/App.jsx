import React, { Component } from 'react';
import InputUPC from './InputUPC';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUPC: '',
      // data: {list: []},
      data: {list: [
        // Valid UPCs
        '082184090466',
        '083085300265',
        '889714000045'

        // Invalid UPCs
        // '82184090466',
        // '0830300265',
        // '889714000045'
      ]},
      errorMessage: '',
      importMessage: ''
    };
    this.updateUPC = this.updateUPC.bind(this);
    this.addUPC = this.addUPC.bind(this);
    this.postUPCs = this.postUPCs.bind(this);
    this.clear = this.clear.bind(this);
  }

  updateUPC(upc) {
    this.setState({currentUPC: upc});
  }
  
  addUPC() {
    axios.post('/validate', {upc: this.state.currentUPC})
      .then(response => {
        console.log('RESPONSE', response);
        if (response.data.hasOwnProperty('error')) {
          this.setState({ errorMessage: response.data.message });
        } else {
          if (response.data.code !== 'OK') {
            this.setState({ errorMessage: response.data.message });
          } else {
            this.setState({
              currentUPC: '',
              data: {list: [...this.state.data.list, this.state.currentUPC]},
              errorMessage: '',
              importMessage: ''
            });
          }
        }
      })
      .catch(error => console.log('Error reaching API endpoint', error));    
  }

  postUPCs() {
    const { list } = this.state.data;

    if (list.length) {
      axios.post('/import', {list})
        .then(response => {
          console.log('Successfully imported UPCs!\n', response);
          this.setState({
            importMessage: 'Successfully imported UPCs!',
            data: {list: []}
          });
        })
        .catch(error => {
          console.log('Error importing UPCs...\n', error);
          this.setState({
            importMessage: 'Error importing UPCs...',
            data: {list: []}
          });
        });
    } else {
      this.setState({
        importMessage: 'Can\'t import empty UPC list.'
      })
    }
  }
  
  clear() {
    this.setState({
      currentUPC: '',
      data: {list: []},
      errorMessage: '',
      importMessage: ''
    });
  }
  
  render() {
    return (
      <div className="main">
        <InputUPC
          currentUPC={this.state.currentUPC}
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
