import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Switch,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/auth/authSlice";
import {
  Apartment,
  fetchMyApartments,
  resetDraft,
  setApartmentOpen,
} from "@/store/slices/apartment/apartmentSlice";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import { formatKip } from "@/utils/format";

const orangeColor = "#C2410C";
const brownColor = "#6B5446";
const blackColor = "#2A1A0F";
const borderColor = "#FFEDD5";
const rowBgColor = "#FFF7EF";
const redColor = "#9A3412";
const switchOffColor = "#D8CBC0";
const thumbColors = ["#FDBA74", "#FED7AA", "#FDE68A"];

const describe = (apt: Apartment) =>
  [
    apt.area,
    apt.type === "studio" ? "Studio" : `${apt.beds} bed`,
    apt.sizeM2 ? `${apt.sizeM2} m²` : null,
  ]
    .filter(Boolean)
    .join(" · ");

export default function Listings() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { myApartments, loading, error } = useAppSelector((s) => s.apartment);

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : blackColor;

  const openCount = myApartments.filter((a) => a.isOpen).length;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMyApartments());
    }, [dispatch]),
  );

  const handleAdd = () => {
    dispatch(resetDraft());
    router.push("/owner/addApartment");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 30 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: colorTheme, fontSize: 26, fontWeight: "700" }}>
              My listings
            </Text>
            <Text style={{ color: brownColor, marginTop: 4 }}>
              {myApartments.length} listing
              {myApartments.length === 1 ? "" : "s"} · {openCount} open
            </Text>
          </View>
          <Pressable
            onPress={handleAdd}
            style={({ pressed }) => ({
              width: 50,
              height: 50,
              borderRadius: 15,
              backgroundColor: orangeColor,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Ionicons name="add" color="#fff" size={32} />
          </Pressable>
        </View>

        {loading && myApartments.length === 0 && (
          <ActivityIndicator color={orangeColor} style={{ marginTop: 40 }} />
        )}

        {error && (
          <Text style={{ color: redColor, marginTop: 20, textAlign: "center" }}>
            {error}
          </Text>
        )}

        {!loading && !error && myApartments.length === 0 && (
          <Text style={{ color: brownColor, marginTop: 40, textAlign: "center" }}>
            No listings yet. Tap + to add your first apartment.
          </Text>
        )}

        <View style={{ gap: 15, marginTop: 20 }}>
          {myApartments.map((apt, index) => (
            <View
              key={apt.id}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1.5,
                borderColor,
                borderRadius: 20,
                padding: 12,
              }}
            >
              <View style={{ flexDirection: "row", gap: 12 }}>
                {apt.photos?.[0] ? (
                  <Image
                    source={{ uri: apt.photos[0] }}
                    style={{ width: 75, height: 75, borderRadius: 12 }}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 12,
                      backgroundColor: thumbColors[index % thumbColors.length],
                    }}
                  />
                )}

                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: blackColor, fontSize: 16, fontWeight: "700" }}
                    numberOfLines={1}
                  >
                    {apt.title}
                  </Text>
                  <Text style={{ color: brownColor, marginTop: 4 }}>
                    {describe(apt)}
                  </Text>
                  <Text
                    style={{
                      color: orangeColor,
                      fontSize: 17,
                      fontWeight: "700",
                      marginTop: 4,
                    }}
                  >
                    {formatKip(apt.rentMonth)}
                    <Text
                      style={{ color: brownColor, fontSize: 13, fontWeight: "400" }}
                    >
                      /mo
                    </Text>
                  </Text>
                </View>

                <Pressable
                  style={({ pressed }) => ({
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor,
                    alignItems: "center",
                    justifyContent: "center",
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  })}
                >
                  <Ionicons name="pencil" size={16} color={blackColor} />
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: rowBgColor,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  marginTop: 12,
                }}
              >
                <Text style={{ color: blackColor, fontWeight: "600" }}>
                  {apt.isOpen ? "Open for reservations" : "Occupied · hidden"}
                </Text>
                <Switch
                  value={apt.isOpen}
                  onValueChange={(value) => {
                    dispatch(setApartmentOpen({ id: apt.id, isOpen: value }));
                  }}
                  trackColor={{ false: switchOffColor, true: orangeColor }}
                  thumbColor="#fff"
                  ios_backgroundColor={switchOffColor}
                />
              </View>
            </View>
          ))}
        </View>

        <Pressable
          style={{ marginTop: 30, alignSelf: "center" }}
          onPress={() =>
            dispatch(logout()).then(() => router.replace("/login"))
          }
        >
          <Text style={{ color: brownColor }}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
