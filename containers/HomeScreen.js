import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, Image } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Les recommandations</Text>
      {/* <Text>Les recettes ! </Text> intégrer recettes depuis une api*/}
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
