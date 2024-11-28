import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CadastroScreen } from './screens/CadastroScreen';
import { EditarScreen } from './screens/EditarScreen';
import HomeScreen from './screens/HomeScreen';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";

const Stack = createNativeStackNavigator();

const API_URL = "http://10.68.152.183:3000/tasks/";

const addTask = async (task) => {
  try {
    await axios.post(API_URL, task);
    fetchTasks();
    setIsFormVisible(false);
  } catch (error) {
    Alert.alert("Error", "Failed to create task");
  }
};


const  App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Página Inicial" }}
        />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Consulta" component={HomeScreen} />
        <Stack.Screen name="Editar" component={EditarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App