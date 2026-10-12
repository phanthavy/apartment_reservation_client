import {
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/slices/auth/authSlice";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const orangeColor = "#C2410C";
const brownColor = "#6B5446";
const blackColor = "#2A1A0F";
const bgBtnColor = "#FFEDD5";

export default function Listings() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24, paddingVertical: 30 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[{ color: colorTheme, fontSize: 24, fontWeight: "600" }]}
          >
            My Listings
          </Text>
          <Pressable
            onPress={() => router.push("/owner/addApartment")}
            style={({ pressed }) => [
              {
                padding: 4,
                backgroundColor: orangeColor,
                borderRadius: 15,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Ionicons name="add" color="#fff" size={35} />
          </Pressable>
        </View>

        <Pressable
          style={[{ marginTop: 200 }]}
          onPress={() =>
            dispatch(logout()).then(() => router.replace("/login"))
          }
        >
          <Text style={[{ color: colorTheme }]}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
