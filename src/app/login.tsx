import { useAppDispatch, useAppSelector } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform,
  useColorScheme,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginThunk } from "../store/slices/auth/authSlice";
import LoadingDots from "@/components/ui/LoadingDot";

export default function login() {
  const colorScheme = useColorScheme();

  const [active, setActive] = useState(false);
  const [activeCreateAccount, setActiveCreateAccount] = useState(false);

  const themeColor = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";

  const redColor = "#9A3412";
  const orangeColor = "#C2410C";
  const bgBtnColor = "#FFEDD5";

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.auth);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setErrors(true);
      return;
    }

    setErrors(false);

    const result = await dispatch(loginThunk(form));
    if (loginThunk.fulfilled.match(result)) {
      router.replace(
        result.payload.user.role === "owner"
          ? "/owner/home"
          : "/renter/explore",
      );
    }
  };

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
          <Pressable
            style={[
              {
                backgroundColor: "#EA580C",
                padding: 5,
                width: 35,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Ionicons name="home-outline" size={24} color="#fff" />
          </Pressable>
          {/* 2 section */}
          <View style={{ marginTop: 25 }}>
            <Text
              style={[{ color: themeColor, fontSize: 28, fontWeight: "600" }]}
            >
              Welcome back!
            </Text>
            <Text style={[{ color: themeColor, marginTop: 10 }]}>
              Log in to see saved places and your bookings.
            </Text>
          </View>

          {/* 3 section */}
          <View style={[{ marginTop: 35, flexDirection: "column", gap: 8 }]}>
            <Text style={[{ color: themeColor, fontWeight: "600" }]}>
              Email or phone number
            </Text>
            <TextInput
              value={form.email}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, email: text }))
              }
              placeholder="020 XXXX XXXX"
              style={[
                {
                  borderWidth: errors && !form.email ? 2 : 1,
                  borderColor: errors && !form.email ? redColor : bgBtnColor,
                  borderRadius: 10,
                  padding: 14,
                  color: themeColor,
                },
              ]}
            />
          </View>

          {/* 4 section */}
          <View style={[{ marginTop: 25, flexDirection: "column", gap: 8 }]}>
            <Text style={[{ color: themeColor, fontWeight: "600" }]}>
              Password
            </Text>
            <TextInput
              value={form.password}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, password: text }))
              }
              placeholder="********"
              style={[
                {
                  borderWidth: errors && !form.email ? 2 : 1,
                  borderColor: errors && !form.email ? redColor : bgBtnColor,
                  borderRadius: 10,
                  padding: 14,
                  color: themeColor,
                },
              ]}
            />
          </View>

          {/* 5 section */}
          <Pressable
            onPressIn={() => setActive(true)}
            onPressOut={() => setActive(false)}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.99 : 1 }] },
            ]}
          >
            <Text
              style={{
                color: active ? redColor : orangeColor,
                fontSize: 12,
                fontWeight: "600",
                marginTop: 15,
                textAlign: "right",
              }}
            >
              Forgot pssword?
            </Text>
          </Pressable>

          {/* 6 section */}
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              {
                backgroundColor: orangeColor,
                padding: 14,
                borderRadius: 10,
                marginTop: 15,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
            disabled={loading}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {loading ? (
                <LoadingDots />
              ) : (
                <Text style={{ color: "#ffffff", fontWeight: "600" }}>
                  Log in
                </Text>
              )}
            </Text>
          </Pressable>

          {/* 7 section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 35,
              gap: 15,
            }}
          >
            <View
              style={{ backgroundColor: bgBtnColor, width: 100, height: 1 }}
            />
            <Text style={{ color: "#fff" }}>Or</Text>
            <View
              style={{ backgroundColor: bgBtnColor, width: 100, height: 1 }}
            />
          </View>

          {/* 8 section */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: "#fff",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: bgBtnColor,
                marginTop: 35,
                transform: [{ scale: pressed ? 0.99 : 1 }],
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 15,
                height: 45,
              },
            ]}
          >
            <Ionicons
              name="phone-portrait-outline"
              size={25}
              color={orangeColor}
            />
            <Text
              style={{
                color: "#000000",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Get a one-time code by SMS
            </Text>
          </Pressable>

          {/* 9 section */}
          <Pressable
            style={[
              {
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                top: 70,
              },
            ]}
          >
            <Text style={[{ color: themeColor }]}>New to ban?</Text>
            <Pressable
              onPressIn={() => setActiveCreateAccount(true)}
              onPressOut={() => setActiveCreateAccount(false)}
              style={({ pressed }) => [
                { transform: [{ scale: pressed ? 0.99 : 1 }] },
              ]}
            >
              <Link
                href={"/"}
                style={{
                  color: activeCreateAccount ? redColor : orangeColor,
                  textDecorationLine: "underline",
                  fontWeight: "600",
                }}
              >
                Create an account
              </Link>
            </Pressable>
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
