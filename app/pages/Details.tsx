import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Question } from "./Question";

const Tab = createBottomTabNavigator();

export function DetailsScreen() {
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
