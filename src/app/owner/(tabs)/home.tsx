
import {
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {


  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24, paddingVertical: 30 }}
      >
        <View>
          <Text style={[{ color: colorTheme }]}>home</Text>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}
