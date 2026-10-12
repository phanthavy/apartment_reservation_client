import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Saved() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24, paddingVertical: 30 }}
      >
        <View>
          <Text>saved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}