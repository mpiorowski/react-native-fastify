import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { Button, TextInput, View } from "react-native";
import { AuthContext } from "../context";

export function HomeScreen() {
  const auth = useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const onPress = async () => {
    await AsyncStorage.setItem("username", username);
    auth?.setIsUsername(true);
  };

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
