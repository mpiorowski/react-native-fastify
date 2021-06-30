import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { createClient, Provider } from "urql";
import { DetailsScreen } from "./pages/Details";
import { HomeScreen } from "./pages/Home";

const Stack = createStackNavigator();
const client = createClient({
  url: `http://192.168.1.21:4000/graphql`,
  requestPolicy: "cache-and-network",
});

function App() {

  return (
    <Provider value={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerLeft: () => null }}>
          <Stack.Screen
            name="Home"
            options={{
              title: "Witamy Was serdzecznie",
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Questions"
            options={{
              title: "Pytania",
            }}
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
