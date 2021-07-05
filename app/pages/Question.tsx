import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, RefreshControl, ScrollView, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useAnswer, useFindQuestion } from "./questions.graphql";
import dayjs from "dayjs";

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const Question: React.FC = () => {
  const [value, setValue] = React.useState("1");
  const router = useRoute();
  let { number } = router.params as { number: number };
  if (dayjs().get("date") < 6) {
    number = number;
  } else if (dayjs().get("date") < 11) {
    number = number + 4;
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const [username, setUsername] = useState("");
  const { data, reexecuteQuery, fetching } = useFindQuestion(username, number);
  const question = data?.question || {};
  useEffect(() => {
    AsyncStorage.getItem("username").then((response) => {
      if (response != "" && response) {
        setUsername(response);
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      reexecuteQuery();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reexecuteQuery();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const addAnswer = useAnswer();
  const handleSave = async () => {
    try {
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

  if (fetching) {
    return <View></View>;
  }

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
          <View style={{ marginTop: 20 }}>
            <Button title="Zapisz" onPress={handleSave} />
          </View>
        </ScrollView>
      )}
      {/* <Button title="wroc" onPress={() => navigation.navigate("Home")} /> */}
    </View>
  );
};
