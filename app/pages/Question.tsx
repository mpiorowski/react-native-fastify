import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, RefreshControl, ScrollView, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import {
  useAnswer,
  useFindQuestion,
} from "./questions.graphql";

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const Question: React.FC = () => {
  const [value, setValue] = React.useState("1");
  const router = useRoute();
  const { number } = router.params as { number: number };

  const [refreshing, setRefreshing] = React.useState(false);

  const [username, setUsername] = useState("");

  const { data, reexecuteQuery } = useFindQuestion(username, number);
  const question = data?.question || {};

  useEffect(() => {
    AsyncStorage.getItem("username").then((response) => {
      if (response != "" && response) {
        setUsername(response);
      }
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reexecuteQuery();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const addAnswer = useAnswer();
  const handleSave = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        await addAnswer.mutate({
          number,
          answer: parseInt(value),
          username: username,
        });
        reexecuteQuery();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {question && question.answered && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text
            style={{
              fontSize: 22,
              padding: 20,
              textAlign: "center",
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            Dziękujemy za odpowiedź
          </Text>
        </ScrollView>
      )}
      {question && !question.answered && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text
            style={{
              fontSize: 22,
              padding: 20,
              textAlign: "center",
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            {question.question}
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              }}
            >
              <RadioButton.Item
                label={question.answer1}
                value={"1"}
                position="leading"
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              }}
            >
              <RadioButton.Item
                label={question.answer2}
                value={"2"}
                position="leading"
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              }}
            >
              <RadioButton.Item
                label={question.answer3}
                value={"3"}
                position="leading"
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              }}
            >
              <RadioButton.Item
                label={question.answer4}
                value={"4"}
                position="leading"
              />
            </View>
          </RadioButton.Group>
          <Button title="Zapisz" onPress={handleSave} />
        </ScrollView>
      )}
      {/* <Button title="wroc" onPress={() => navigation.navigate("Home")} /> */}
    </View>
  );
};
