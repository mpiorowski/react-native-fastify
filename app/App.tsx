import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { createClient, Provider } from "urql";
import { AuthContext } from "./context";
import { CodeScreen } from "./pages/Code";
import { DetailsScreen } from "./pages/Details";
import { HomeScreen } from "./pages/Home";

const Stack = createStackNavigator();
const client = createClient({
  url: `http://192.168.1.21:4444/graphql`,
  requestPolicy: "network-only",
  fetchOptions: {
    mode: "cors",
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const [isCode, setIsCode] = useState(false);
  const [isUsername, setIsUsername] = useState(false);

  useEffect(() => {
    const check = async () => {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        setIsUsername(true);
      }
      const code = await AsyncStorage.getItem("code");
      if (code && code === "weseleziomkowipoziomkow") {
        setIsCode(true);
      }
      setLoading(false);
    };
    check();
  }, []);

  if (loading) {
    // We haven't finished checking for the user yet
    return <View />;
  }

  return (
    <Provider value={client}>
      <AuthContext.Provider
        value={{
          setIsCode,
          setIsUsername,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerLeft: () => null }}>
            {!isCode && (
              <Stack.Screen
                name="Code"
                options={{
                  title: "Witamy Was serdzecznie",
                }}
                component={CodeScreen}
              />
            )}
            {isCode && !isUsername && (
              <Stack.Screen
                name="Home"
                options={{
                  title: "Witamy Was serdzecznie",
                }}
                component={HomeScreen}
              />
            )}
            {isCode && isUsername && (
              <Stack.Screen
                name="Questions"
                options={{
                  title: "Pytania",
                }}
                component={DetailsScreen}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
