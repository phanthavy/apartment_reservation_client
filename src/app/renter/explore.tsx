import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/auth/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const { user } = useAppSelector((state) => state.auth);

  const mockNotify = 10;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";

  const orangeColor = "#C2410C";
  const brownColor = "#6B5446";
  const blackColor = "#2A1A0F";
  const bgBtnColor = "#FFEDD5";
  const redColor = "#9A3412";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24, paddingVertical: 30 }}
      >
        {/* section 1 */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={[{ color: colorTheme }]}>Sabaiydee, {user?.name}</Text>
            <Text
              style={[
                {
                  color: colorTheme,
                  fontSize: 24,
                  fontWeight: "600",
                  marginTop: 15,
                },
              ]}
            >
              Find Your Apartment
            </Text>
          </View>
          <Pressable
            style={[
              {
                backgroundColor: "#ffffff",
                padding: 6,
                borderRadius: 8,
                position: "relative",
              },
            ]}
          >
            <Ionicons name="notifications-outline" color="#000" size={30} />
            <View
              style={{
                backgroundColor: redColor,
                borderRadius: "100%",
                width: 22,
                height: 22,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: 2,
              }}
            >
              {mockNotify < 10 ? (
                <Text style={{ color: "#fff", fontSize: 9 }}>{mockNotify}</Text>
              ) : (
                <Text style={{ color: "#fff", fontSize: 9 }}>10+</Text>
              )}
            </View>
          </Pressable>
        </View>

        {/* section 2 */}
        <View style={{ marginTop: 25, flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1, position: "relative" }}>
            <TextInput
              style={[
                {
                  color: "#000",
                  backgroundColor: "#fff",
                  borderWidth: 2,
                  borderColor: bgBtnColor,
                  borderRadius: 15,
                  paddingHorizontal: 35,
                  paddingVertical: 10,
                  flex: 1,
                },
              ]}
              placeholder="Area, building or street"
            />
            <Ionicons name="search-outline" color={blackColor} size={25} style={{position: 'absolute', top: 15, left: 8}}/>
          </View>
          <Pressable
            style={[
              {
                backgroundColor: "#fff",
                borderWidth: 2,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,
              },
            ]}
          >
            <Ionicons name="filter-outline" color="#000" size={30} />
          </Pressable>
        </View>

        <Pressable
          style={{ marginTop: 150 }}
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
