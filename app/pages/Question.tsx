import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Button, RefreshControl, ScrollView, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useFindAllQuestions } from "./questions.graphql";

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const Question: React.FC = () => {
  const { data, reexecuteQuery } = useFindAllQuestions();
  const questions = data?.questions || [];

  const [value, setValue] = React.useState("1");

  const router = useRoute();
  const navigation = useNavigation();
  const { number } = router.params as { number: number };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reexecuteQuery();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View>
      {questions && questions[number - 1] && (
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
            {questions[number - 1].question}
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
                label={questions[number - 1].answer1}
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
                label={questions[number - 1].answer2}
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
                label={questions[number - 1].answer3}
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
                label={questions[number - 1].answer4}
                value={"4"}
                position="leading"
              />
            </View>
          </RadioButton.Group>
        </ScrollView>
      )}
      <Button title="wroc" onPress={() => navigation.navigate("Home")} />
      <Button
        title="clear"
        onPress={async () => {
          await AsyncStorage.setItem("username", "");
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};
