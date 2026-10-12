import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const orangeColor = "#C2410C";
const brownColor = "#6B5446";
const blackColor = "#2A1A0F";
const bgBtnColor = "#FFF4EA";
const btnColor = "#FED7AA";

export default function AddApartment() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";
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
            alignItems: "center",
            gap: 25,
          }}
        >
          <Pressable
            onPress={() =>
              router.canGoBack()
                ? router.back()
                : router.replace("/owner/listings")
            }
            style={({ pressed }) => [
              {
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: btnColor,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 4,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Ionicons name="close-outline" size={28} color={blackColor} />
          </Pressable>
          <Text style={{ color: colorTheme, fontSize: 24, fontWeight: "600" }}>
            Add an apartment
          </Text>
        </View>

        {/* section 2 */}
        <Text
          style={{
            color: colorTheme,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 25,
          }}
        >
          Photos
        </Text>
        <Pressable
          style={({ pressed }) => [
            {
              padding: 25,
              backgroundColor: bgBtnColor,
              borderWidth: 2,
              borderColor: orangeColor,
              borderStyle: "dashed",
              borderRadius: 15,
              width: "33.33%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            },
          ]}
        >
          <Ionicons name="camera" size={28} color={orangeColor} />
          <Text
            style={{
              color: orangeColor,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Add photos
          </Text>
        </Pressable>

        {/* section 3 */}
        <Text
          style={{
            color: colorTheme,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 25,
          }}
        >
          Apartment name
        </Text>
        <TextInput
          style={[
            {
              color: "#000",
              backgroundColor: "#fff",
              borderWidth: 2,
              borderColor: bgBtnColor,
              borderRadius: 15,
              padding: 15,
              flex: 1,
              marginTop: 15,
            },
          ]}
          placeholder="Garden Loft, 2A"
        />

        {/* section 4 */}
        <Text
          style={{
            color: colorTheme,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 25,
          }}
        >
          Area
        </Text>
        <TextInput
          style={[
            {
              color: "#000",
              backgroundColor: "#fff",
              borderWidth: 2,
              borderColor: bgBtnColor,
              borderRadius: 15,
              padding: 15,
              flex: 1,
              marginTop: 15,
            },
          ]}
          placeholder="Garden Loft, 2A"
        />

        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginTop: 25,
            },
          ]}
        >
          {/* section 5 */}
          <View style={{ width: "50%" }}>
            <Text
              style={{
                color: colorTheme,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Size (mm)
            </Text>
            <TextInput
              style={[
                {
                  color: "#000",
                  backgroundColor: "#fff",
                  borderWidth: 2,
                  borderColor: bgBtnColor,
                  borderRadius: 15,
                  padding: 15,
                  flex: 1,
                  marginTop: 15,
                },
              ]}
              placeholder="Garden Loft, 2A"
            />
          </View>
          {/* section 6 */}
          <View style={{ width: "50%" }}>
            <Text
              style={{
                color: colorTheme,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Bedrooms
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 15,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: bgBtnColor,
                marginTop: 15,
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: btnColor,
                    borderRadius: 10,
                    padding: 2,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
              >
                <Ionicons name="remove" color={orangeColor} size={25} />
              </Pressable>
              <Text style={{ color: blackColor, fontWeight: "600" }}>2</Text>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: btnColor,
                    borderRadius: 10,
                    padding: 2,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
              >
                <Ionicons name="add" color={orangeColor} size={25} />
              </Pressable>
            </View>
          </View>
        </View>

        {/*  section 7*/}
        <View style={{ marginTop: 35, flexDirection: "row", gap: 15 }}>
          <Pressable
            style={({ pressed }) => [
              {
                width: "30%",
                backgroundColor: "#fff",
                borderColor: btnColor,
                borderWidth: 2,
                borderRadius: 15,
                paddingHorizontal: 10,
                paddingVertical: 10,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
          >
            <Text style={{ fontWeight: "600", textAlign: "center" }}>
              Save Draft
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                width: "70%",
                backgroundColor: orangeColor,
                borderColor: btnColor,
                borderWidth: 2,
                borderRadius: 15,
                paddingHorizontal: 10,
                paddingVertical: 10,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
          >
            <Text
              style={{ fontWeight: "600", textAlign: "center", color: "#fff" }}
            >
              Next: rules & price
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
