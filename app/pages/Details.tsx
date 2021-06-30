import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Question } from "./Question";

const Tab = createBottomTabNavigator();

export function DetailsScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const response = await AsyncStorage.getItem("username");
      response && setUsername(response);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 16,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlignVertical: "center",
        },
      }}
    >
      <Tab.Screen
        name="Pytanie 1"
        component={Question}
        initialParams={{ number: 1 }}
      />
      <Tab.Screen
        name="Pytanie 2"
        component={Question}
        initialParams={{ number: 2 }}
      />
      <Tab.Screen
        name="Pytanie 3"
        component={Question}
        initialParams={{ number: 3 }}
      />
      <Tab.Screen
        name="Pytanie 4"
        component={Question}
        initialParams={{ number: 4 }}
      />
    </Tab.Navigator>
  );
}
