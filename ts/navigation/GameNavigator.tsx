import React from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen/components/HomeScreen';
import {ROUTES} from './routes';

const defaultNavOptions: StackNavigationOptions = {
  headerShown: false,
};

const opacityTransition: object = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
    },
    close: {
      animation: 'timing',
      config: {
        duration: 600,
      },
    },
  },
  cardStyleInterpolator: ({current}: {current: {progress: number}}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
};

const GameStackNavigator = createStackNavigator();

const GameNavigator = () => {
  const {home} = ROUTES;
  return (
    <GameStackNavigator.Navigator screenOptions={{...defaultNavOptions, ...opacityTransition}}>
      <GameStackNavigator.Screen name={home} component={HomeScreen} />
    </GameStackNavigator.Navigator>
  );
};

export default GameNavigator;
