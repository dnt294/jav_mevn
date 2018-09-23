import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { HeaderLeftComponent } from './headers.component';
import { VerbsComponent } from '../verbs/verbs.component';

const DrawerStack = createDrawerNavigator(
  {
    Verbs: VerbsComponent,
  },
)

export const RootStack = createStackNavigator(
  {
    drawerStack: DrawerStack
  },
  {
    navigationOptions: ({navigation}) => (
      {
        headerStyle: {
          backgroundColor: '#605CA8'
        },
        headerTintColor: '#fff',
        headerLeft: props => <HeaderLeftComponent navigation={navigation}/>
      }
    )
  }
);
