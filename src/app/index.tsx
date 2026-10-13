import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { useAppSelector } from "@/store";

export default function LoginScreen() {
  const { token, user } = useAppSelector((s) => s.auth);

  const [seeker, setSeeker] = useState(false);
  const [owner, setOwner] = useState(false);

  const router = useRouter();

  const colorScheme = useColorScheme();

  const themeColor = colorScheme === "dark" ? "#fff" : "#2A1A0F";

  const orangeColor = "#C2410C";
  const brownColor = "#6B5446";
  const blackColor = "#2A1A0F";
  const bgBtnColor = "#FFEDD5";

  if (token)
    return (
      <Redirect
        href={
          user?.role === "owner" ? "/owner/reviewAndPublic" : "/renter/explore"
        }
      />
    );

  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      <KeyboardAvoidingView
        style={[styles.keyboardavoidingview]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 24, paddingVertical: 30 }}
        >
          {/* 1 section */}
          <View
            style={[
              {
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              },
            ]}
          >
            <Pressable
              style={[
                {
                  backgroundColor: "#EA580C",
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                },
              ]}
            >
              <Ionicons name="home-outline" size={24} color="#fff" />
            </Pressable>
            <Text
              style={[{ color: themeColor, fontWeight: "600", fontSize: 20 }]}
            >
              Baan
            </Text>
          </View>

          {/* 2 section */}
          <Image
            source={require("../../assets/images/reservation_images/welcome.png")}
            style={{
              width: "100%",
              height: 220,
              borderRadius: 22,
              marginTop: 25,
            }}
            contentFit="cover"
          />

          {/* 3 section */}
          <View>
            <Text
              style={[
                {
                  color: themeColor,
                  fontSize: 30,
                  marginTop: 15,
                  fontWeight: "600",
                },
              ]}
            >
              Find your next home, or fill your rooms.
            </Text>
            <Text style={[{ color: themeColor, fontSize: 15, marginTop: 15 }]}>
              Tell us who you are and we’ll set things up for you.
            </Text>
          </View>

          {/* 4 section */}
          <Pressable
            onPressIn={() => setSeeker(true)}
            onPressOut={() => setSeeker(false)}
            onPress={() => router.push("/login")}
            style={({ pressed }) => [
              {
                padding: 16,
                borderWidth: 2,
                borderColor: seeker ? orangeColor : blackColor,
                backgroundColor: "#fff",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 25,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
          >
            <View
              style={[
                {
                  backgroundColor: bgBtnColor,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 9,
                },
              ]}
            >
              <Ionicons name="search" size={20} color={orangeColor} />
            </View>
            <View>
              <Text style={[{ color: blackColor, fontWeight: "600" }]}>
                I'm looing for a place
              </Text>
              <Text style={{ color: brownColor }}>
                Browse and reserve apartments
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={25}
              color={orangeColor}
            />
          </Pressable>

          {/* 5 section */}
          <Pressable
            onPressIn={() => setOwner(true)}
            onPressOut={() => setOwner(false)}
            onPress={() => router.push("/login")}
            style={({ pressed }) => [
              {
                padding: 16,
                borderWidth: 2,
                borderColor: owner ? orangeColor : blackColor,
                backgroundColor: "#fff",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 25,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
          >
            <View
              style={[
                {
                  backgroundColor: bgBtnColor,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 9,
                },
              ]}
            >
              <Ionicons name="search" size={20} color={orangeColor} />
            </View>
            <View>
              <Text style={[{ color: blackColor, fontWeight: "600" }]}>
                I own apartment
              </Text>
              <Text style={{ color: brownColor }}>
                List rooms and manage bookings
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={25}
              color={orangeColor}
            />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  keyboardavoidingview: {
    flex: 1,
  },
});
