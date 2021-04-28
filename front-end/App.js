import React from 'react';
import {AppStack} from './src/navigation/StackNavigator.js'

const App: () => React$Node = () => {
    return (
      <>
        <AppStack />
      </>
    );
  };



export default App;