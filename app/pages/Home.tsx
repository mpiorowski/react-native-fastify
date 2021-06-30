import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, TextInput, View } from "react-native";

export function HomeScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState("");
  const onPress = async () => {
    await AsyncStorage.setItem("username", username);
    navigation.navigate("Questions");
  };

  useEffect(() => {
    const getUsername = async () => {
      const response = await AsyncStorage.getItem("username");
      if (response) {
        navigation.navigate("Questions");
      }
    };
    getUsername();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 30,
      }}
    >
      <TextInput
        style={{
          marginBottom: 20,
          paddingLeft: 10,
          height: 50,
          borderWidth: 1,
          borderRadius: 4,
        }}
        onChangeText={setUsername}
        value={username}
        placeholder="Podaj swoje imię i nazwisko"
      />
      <Button title="Dalej" onPress={onPress} />
    </View>
  );
}
