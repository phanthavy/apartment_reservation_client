import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import StepHeader from "@/components/ui/StepHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { publishApartment } from "@/store/slices/apartment/apartmentSlice";
import { formatKip, formatShortDate } from "@/utils/format";

const orangeColor = "#C2410C";
const brownColor = "#6B5446";
const blackColor = "#2A1A0F";
const bgBtnColor = "#FFF4EA";
const btnColor = "#FED7AA";
const greenColor = "#15803D";
const redColor = "#9A3412";
const photoBgColor = "#FDE68A";

export default function ReviewAndPublic() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { draft: listing, publishing, error } = useAppSelector(
    (s) => s.apartment,
  );

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";

  const [confirmed, setConfirmed] = useState(false);

  const rent = Number(listing.rentMonth) || 0;
  const depositMonths = listing.depositMonths ?? 0;
  const minStay = listing.minStayMonths ?? 1;

  const details = [
    {
      label: "Deposit",
      value:
        depositMonths === 0
          ? "None"
          : `${depositMonths} month${depositMonths > 1 ? "s" : ""} (${formatKip(depositMonths * rent)})`,
    },
    {
      label: "Minimum stay",
      value: `${minStay} month${minStay > 1 ? "s" : ""}`,
    },
    {
      label: "Included",
      value: listing.included.length ? listing.included.join(", ") : "Nothing",
    },
    {
      label: "House rules",
      value: `${listing.petsAllowed ? "Pets OK" : "No pets"} · ${listing.smokingAllowed ? "Smoking OK" : "No smoking"}`,
    },
  ];

  const handlePublish = async () => {
    const result = await dispatch(publishApartment());
    if (publishApartment.fulfilled.match(result)) {
      router.dismissTo("/owner/listings");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 30,
          paddingBottom: 24,
        }}
      >
        {/* section 1 */}
        <StepHeader
          title="Review & publish"
          step={3}
          onBack={() =>
            router.canGoBack()
              ? router.back()
              : router.replace("/owner/rulesAndPrice")
          }
        />

        <Text style={{ color: brownColor, marginTop: 20 }}>
          This is how renters will see your apartment.
        </Text>

        {/* section 2 */}
        <View
          style={{
            marginTop: 15,
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: bgBtnColor,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: 150,
              backgroundColor: photoBgColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 1,
                backgroundColor: "#fff",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={{ color: greenColor, fontWeight: "600", fontSize: 12 }}>
                {listing.availableFrom
                  ? `From ${formatShortDate(listing.availableFrom)}`
                  : "Available now"}
              </Text>
            </View>

            {listing.photos.length > 0 ? (
              <Image
                source={{ uri: listing.photos[0] }}
                style={{ position: "absolute", width: "100%", height: "100%" }}
                contentFit="cover"
              />
            ) : (
              <Ionicons name="home-outline" size={40} color={orangeColor} />
            )}

            {listing.photos.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  backgroundColor: blackColor,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
                  {listing.photos.length} photo
                  {listing.photos.length === 1 ? "" : "s"}
                </Text>
              </View>
            )}
          </View>

          <View style={{ padding: 15 }}>
            <Text style={{ color: blackColor, fontSize: 18, fontWeight: "600" }}>
              {listing.title}
            </Text>
            <Text style={{ color: brownColor, marginTop: 6 }}>
              {listing.area}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: blackColor, fontWeight: "600" }}>
                {listing.beds === 0 ? "Studio" : `${listing.beds} bed`}
                {listing.sizeM2 ? ` · ${listing.sizeM2} m²` : ""}
              </Text>
              <Text style={{ color: orangeColor, fontSize: 18, fontWeight: "700" }}>
                {formatKip(rent)}
                <Text style={{ color: brownColor, fontSize: 13, fontWeight: "400" }}>
                  /mo
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* section 3 */}
        <View
          style={{
            marginTop: 15,
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: bgBtnColor,
            borderRadius: 15,
            paddingHorizontal: 15,
          }}
        >
          {details.map((row, index) => (
            <View
              key={row.label}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: bgBtnColor,
              }}
            >
              <Text style={{ color: brownColor }}>{row.label}</Text>
              <Text style={{ color: blackColor, fontWeight: "600" }}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        {/* section 4 */}
        <Pressable
          onPress={() => setConfirmed((prev) => !prev)}
          style={{ flexDirection: "row", gap: 10, marginTop: 15 }}
        >
          <Ionicons
            name={confirmed ? "checkbox" : "square-outline"}
            size={24}
            color={orangeColor}
          />
          <Text style={{ flex: 1, color: colorTheme, lineHeight: 20 }}>
            I confirm this information is correct and I have the right to rent
            out this apartment.
          </Text>
        </Pressable>

        {error && (
          <Text style={{ color: redColor, marginTop: 12, textAlign: "center" }}>
            {error}
          </Text>
        )}
      </ScrollView>

      {/* section 5 */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          paddingHorizontal: 24,
          paddingVertical: 15,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: btnColor,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              flex: 1,
              backgroundColor: "#fff",
              borderColor: btnColor,
              borderWidth: 2,
              borderRadius: 15,
              paddingVertical: 14,
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.99 : 1 }],
            },
          ]}
        >
          <Text
            style={{ fontWeight: "600", textAlign: "center", color: blackColor }}
          >
            Save draft
          </Text>
        </Pressable>
        <Pressable
          onPress={handlePublish}
          disabled={!confirmed || publishing}
          style={({ pressed }) => [
            {
              flex: 2,
              backgroundColor: orangeColor,
              borderRadius: 15,
              paddingVertical: 14,
              justifyContent: "center",
              opacity: confirmed && !publishing ? 1 : 0.5,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            },
          ]}
        >
          <Text
            style={{ fontWeight: "600", textAlign: "center", color: "#fff" }}
          >
            {publishing ? "Publishing..." : "Publish listing"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
