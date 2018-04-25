import React, { Component } from 'react';
import './App.css';

import app from './makeApp';
import Resources from './Components/Resources';
import UnitList from './Components/UnitList';
import ArmySummary from './Components/ArmySummary';
import ArmyBalance from './Components/ArmyBalance';

class App extends Component {
  componentDidMount() {
    app.addChangeListener(this.handleChange)
  }

  componentWillUnmount() {
    app.removeChangeListener(this.handleChange)
  }

  handleChange = () => {
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">
        <Resources />
        <hr />
        <UnitList />
        <hr />
        <ArmySummary />
        <hr />
        <ArmyBalance />
      </div>
    );
  }
}

export default App;
