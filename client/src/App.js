import React, { Component } from 'react';
import './App.css';
import AppMain from './components'
import { EntryModal } from './components/modals';

class App extends Component {
  state = {
    entryModal: false
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({ entryModal: true }), 1000)
  }

  onCloseModal = () => {
    this.setState({ entryModal: false })
  }

  render() {
    const { entryModal } = this.state;

    return (
      <div className="App">
        <AppMain />
        { entryModal && <EntryModal onClick={this.onCloseModal}/> }
      </div>
    );
  }
}

export default App;
