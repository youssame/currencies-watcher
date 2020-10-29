import React, { useEffect } from 'react';
import Currencies from './screens/Currencies'
import Charts from './screens/Charts'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Permissions from 'expo-permissions';
import { showNotificationsInForeground, sendScheduleNotification } from './utils/Notifications';
import { setDailyBackgroundFetch, registerDailyDefaultTask, removeAllTasks } from './utils/Tasks';
const Stack = createStackNavigator();

removeAllTasks();
registerDailyDefaultTask(() => { sendScheduleNotification({ title: 'Check the new states of the currencies', body: '', data: { loadData: true } }, { seconds: 1  }) });
showNotificationsInForeground();


export default function App() {
  setDailyBackgroundFetch()
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then(statusObj => {
      if (statusObj.status != 'granted') {
        return Permissions.Async(Permissions.NOTIFICATIONS);
      }
      return statusObj;
    })
    .then(statusObj => {
      if (statusObj.status != 'granted') {
        throw new Error('Notifications Permissions Not Granted')
      }
    })
  }, []);
  
  return (
      <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Currencies}
        />
        <Stack.Screen name="Charts" component={Charts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

