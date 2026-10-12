import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bookings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24, paddingVertical: 30 }}
      >
        <View>
          <Text>booking</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
