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
  url: `http://146.59.13.247:4444/graphql`,
  requestPolicy: "network-only",
  fetchOptions: {
    mode: "cors"
  }
});

function App() {
  const [initialRouter, setInitialRouter] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsername = async () => {
      const response = await AsyncStorage.getItem("username");
      if (response) {
        setInitialRouter("Questions");
      } else {
        setInitialRouter("Home");
      }
      setLoading(false);
    };
    getUsername();
  }, []);

  return (
    <Provider value={client}>
      <NavigationContainer>
        {!loading && (
          <Stack.Navigator
            screenOptions={{ headerLeft: () => null }}
            initialRouteName={initialRouter}
          >
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
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
