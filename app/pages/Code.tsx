import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthContext } from "../App";

export function CodeScreen() {
  const auth = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const onPress = async () => {
    if (code !== "weseleziomkowipoziomkow") {
      setError("Zły kod");
      return;
    }
    await AsyncStorage.setItem("code", code);
    auth?.setIsCode(true);
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
        onChangeText={setCode}
        value={code}
        placeholder="Podaj kod"
      />
      <Button title="Dalej" onPress={onPress} />
      <Text
        style={{
          display: !error ? "none" : "flex",
          paddingLeft: 10,
          color: "red",
          marginTop: 10,
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        {error}
      </Text>
    </View>
  );
}
