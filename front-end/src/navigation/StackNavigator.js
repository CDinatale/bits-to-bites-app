import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/Login.js';
import SearchRecipesScreen from '../screens/SearchRecipes.js';
import StartRecipeScreen from '../screens/StartRecipe.js';
import SearchParametersScreen from '../screens/SearchParameters.js';
import EditUsernameScreen from '../screens/EditUsername.js';
import EditEmailScreen from '../screens/EditEmail.js';
import EditPasswordScreen from '../screens/EditPassword.js';
import ForgotPasswordScreen from '../screens/ForgotPassword.js';
import RegisterScreen from '../screens/Register.js';
import AdminDashboardScreen from "../screens/AdminDashboard.js";
import AdminStartRecipeScreen from '../screens/AdminStartRecipe.js';
import AdminManageUploadsScreen from "../screens/AdminManageUploads.js";
import AdminManageUserScreen from "../screens/AdminManageUser.js";
import AppTab from '../navigation/TabNavigator.js';
import UploadRecipeScreen from '../screens/UploadRecipe.js';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen
             name="Login"
             component={LoginScreen}
             options={{
                title: '',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0
                },
                headerTransparent: true,
              }}

           />
           <Stack.Screen
             name="Register"
             component={RegisterScreen}
             options={{
                 title: '',
                 headerStyle: {
                   elevation: 0,
                   shadowOpacity: 0
                 },
                 headerTransparent: true,
               }}
           />
           <Stack.Screen
             name="AdminStartRecipe"
             component={AdminStartRecipeScreen}
             options={{
                 title: '',
                 headerStyle: {
                   elevation: 0,
                   shadowOpacity: 0
                 },
                 headerTransparent: true,
               }}
           />
           <Stack.Screen
             name="AdminManageUser"
             component={AdminManageUserScreen}
             options={{
                 title: '',
                 headerStyle: {
                   elevation: 0,
                   shadowOpacity: 0
                 },
                 headerTransparent: true,
               }}
           />
          <Stack.Screen
             name="AdminManageUploads"
             component={AdminManageUploadsScreen}
             options={{
                 title: '',
                 headerStyle: {
                   elevation: 0,
                   shadowOpacity: 0
                 },
                 headerTransparent: true,
               }}
           />

           <Stack.Screen
             name="ForgotPassword"
             component={ForgotPasswordScreen}
             options={{
                 title: '',
                 headerStyle: {
                   elevation: 0,
                   shadowOpacity: 0
                 },
                 headerTransparent: true,
               }}
           />
          <Stack.Screen name="Dashboard"
            component={AppTab}
            options={{
              headerShown: false, // change this to `false`
            }}/>

            <Stack.Screen
             name="SearchParameters"
             component={SearchParametersScreen}
             options={{
                 title: '',
                 headerStyle: {
                   elevation: 0,
                   shadowOpacity: 0
                 },
                 headerTransparent: true,
               }}
           />
            <Stack.Screen
             name="StartRecipe"
             component={StartRecipeScreen}
             options={{
                 title: '',
                 headerStyle: {
                   elevation: 0,
                   shadowOpacity: 0
                 },
                 headerTransparent: true,
               }}
           />
           <Stack.Screen
            name="SearchRecipes"
            component={SearchRecipesScreen}
            options={{
                title: '',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0
                },
                headerTransparent: true,
              }}
          />
           <Stack.Screen
            name="EditUsername"
            component={EditUsernameScreen}
            options={{
                title: '',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0
                },
                headerTransparent: true,
              }}
          />
          <Stack.Screen
           name="EditEmail"
           component={EditEmailScreen}
           options={{
               title: '',
               headerStyle: {
                 elevation: 0,
                 shadowOpacity: 0
               },
               headerTransparent: true,
             }}
         />
         <Stack.Screen
          name="EditPassword"
          component={EditPasswordScreen}
          options={{
              title: '',
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0
              },
              headerTransparent: true,
            }}
        />
        <Stack.Screen
         name="UploadRecipe"
         component={UploadRecipeScreen}
         options={{
             title: '',
             headerStyle: {
               elevation: 0,
               shadowOpacity: 0
             },
             headerTransparent: true,
           }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export {AppStack};
