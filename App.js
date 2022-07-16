import React, { Component } from 'react';
import { LogBox } from 'react-native';
import AppContainer from './src/appContainer/appContainer';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppProvider from './src/appContext/appContext';
import Colors from './src/constant/Colors';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.primary,
    disabled: Colors.primaryLite
  }
};

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      </AppProvider>
    );
  }
}
