import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Main from './pages/main'
import Message from './pages/message'

const Stack = createStackNavigator()
export default function Routes () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='SignIn'
          component={SignIn}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='SignUp'
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Main'
          component={Main}
        />
        <Stack.Screen
          options={{ headerShown: true, title: 'Nova Mensagem' }}
          name='Message'
          component={Message}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
