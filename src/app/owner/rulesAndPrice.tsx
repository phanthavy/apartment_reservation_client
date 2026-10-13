import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  Pressable,
  TextInput,
  Platform,
  Switch,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepHeader from "@/components/ui/StepHeader";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateDraft } from "@/store/slices/apartment/apartmentSlice";

const orangeColor = "#C2410C";
const brownColor = "#6B5446";
const blackColor = "#2A1A0F";
const bgBtnColor = "#FFF4EA";
const btnColor = "#FED7AA";
const redColor = "#9A3412";

const UTILITIES = ["Water", "Electricity", "Wifi", "Cleaning"];

const DEPOSIT_OPTIONS = [
  { value: 0, label: "None" },
  { value: 1, label: "1 Month" },
  { value: 2, label: "2 Months" },
];
const MIN_STAY_OPTIONS = [
  { value: 3, label: "3 Months" },
  { value: 6, label: "6 Months" },
  { value: 12, label: "12 Months" },
];

export default function RulesAndPrice() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const colorTheme = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";

  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.apartment.draft);
  const [showPicker, setShowPicker] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const availableFrom = draft.availableFrom
    ? new Date(draft.availableFrom)
    : null;
  const deposit = draft.depositMonths;
  const minStay = draft.minStayMonths;
  const included = draft.included;
  const rentMissing = !(Number(draft.rentMonth) > 0);

  const onPickDate = (_event: unknown, date: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    dispatch(updateDraft({ availableFrom: date.toISOString() }));
  };
  const onDismissPicker = () => setShowPicker(false);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const toggleIncluded = (item: string) =>
    dispatch(
      updateDraft({
        included: included.includes(item)
          ? included.filter((i) => i !== item)
          : [...included, item],
      }),
    );

  const handleNext = () => {
    if (rentMissing) {
      setShowErrors(true);
      return;
    }
    router.push("/owner/reviewAndPublic");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 30,
          paddingBottom: 24,
        }}
      >
        {/* section 1 */}
        <StepHeader
          title="Rules & price"
          step={2}
          onBack={() =>
            router.canGoBack()
              ? router.back()
              : router.replace("/owner/addApartment")
          }
        />

        {/* section 2 */}
        <View style={{ flexDirection: "row", gap: 15 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colorTheme,
                fontSize: 16,
                fontWeight: "600",
                marginTop: 25,
              }}
            >
              Monthly rent
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: showErrors && rentMissing ? redColor : bgBtnColor,
                borderRadius: 15,
                paddingHorizontal: 15,
                marginTop: 15,
              }}
            >
              <TextInput
                value={draft.rentMonth}
                onChangeText={(text) =>
                  dispatch(
                    updateDraft({ rentMonth: text.replace(/[^0-9]/g, "") }),
                  )
                }
                style={{ flex: 1, color: "#000", paddingVertical: 15 }}
                placeholder="700000"
                keyboardType="numeric"
              />
              <Text style={{ color: orangeColor }}>Kip</Text>
            </View>
            {showErrors && rentMissing && (
              <Text style={{ color: redColor, marginTop: 6 }}>
                Enter the monthly rent
              </Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colorTheme,
                fontSize: 16,
                fontWeight: "600",
                marginTop: 25,
              }}
            >
              Available from
            </Text>
            <Pressable
              onPress={() => setShowPicker(true)}
              style={{
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: bgBtnColor,
                borderRadius: 15,
                padding: 15,
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: availableFrom ? "#000" : "#999" }}>
                {availableFrom ? formatDate(availableFrom) : "Select date"}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={orangeColor} />
            </Pressable>

            {showPicker && Platform.OS === "android" && (
              <DateTimePicker
                value={availableFrom ?? new Date()}
                mode="date"
                minimumDate={new Date()}
                display="default"
                onValueChange={onPickDate}
                onDismiss={onDismissPicker}
              />
            )}

            {Platform.OS === "ios" && (
              <Modal
                visible={showPicker}
                transparent
                animationType="fade"
                onRequestClose={onDismissPicker}
              >
                <Pressable
                  onPress={onDismissPicker}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 24,
                  }}
                >
                  <Pressable
                    onPress={() => {}}
                    style={{
                      width: "100%",
                      backgroundColor: "#fff",
                      borderRadius: 20,
                      padding: 16,
                    }}
                  >
                    <DateTimePicker
                      value={availableFrom ?? new Date()}
                      mode="date"
                      minimumDate={new Date()}
                      display="inline"
                      themeVariant="light"
                      accentColor={orangeColor}
                      onValueChange={onPickDate}
                    />
                    <Pressable
                      onPress={onDismissPicker}
                      style={{
                        marginTop: 8,
                        backgroundColor: orangeColor,
                        borderRadius: 12,
                        paddingVertical: 12,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>
                        Done
                      </Text>
                    </Pressable>
                  </Pressable>
                </Pressable>
              </Modal>
            )}
          </View>
        </View>

        {/* section 3 */}
        <Text
          style={{
            color: colorTheme,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 25,
          }}
        >
          Security deposite
        </Text>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 15 }}>
          {DEPOSIT_OPTIONS.map((opt) => {
            const selected = deposit === opt.value;
            return (
              <Pressable
                key={opt.value}
                onPress={() =>
                  dispatch(updateDraft({ depositMonths: opt.value }))
                }
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: selected ? orangeColor : "#fff",
                  borderWidth: 2,
                  borderColor: selected ? orangeColor : bgBtnColor,
                  borderRadius: 15,
                  paddingVertical: 15,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                })}
              >
                <Text
                  style={{
                    color: selected ? "#fff" : "#000",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* section 4 */}
        <Text
          style={{
            color: colorTheme,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 25,
          }}
        >
          Minimun stay
        </Text>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 15 }}>
          {MIN_STAY_OPTIONS.map((opt) => {
            const selected = minStay === opt.value;
            return (
              <Pressable
                key={opt.value}
                onPress={() =>
                  dispatch(updateDraft({ minStayMonths: opt.value }))
                }
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: selected ? orangeColor : "#fff",
                  borderWidth: 2,
                  borderColor: selected ? orangeColor : bgBtnColor,
                  borderRadius: 15,
                  paddingVertical: 15,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                })}
              >
                <Text
                  style={{
                    color: selected ? "#fff" : "#000",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* section 5 */}
        <Text
          style={{
            color: colorTheme,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 25,
          }}
        >
          Included in rent
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 15,
          }}
        >
          {UTILITIES.map((item) => {
            const selected = included.includes(item);
            return (
              <Pressable
                key={item}
                onPress={() => toggleIncluded(item)}
                style={({ pressed }) => ({
                  width: "31%",
                  backgroundColor: selected ? orangeColor : "#fff",
                  borderWidth: 2,
                  borderColor: selected ? orangeColor : bgBtnColor,
                  borderRadius: 15,
                  paddingVertical: 15,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                })}
              >
                <Text
                  style={{
                    color: selected ? "#fff" : "#000",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* section 6 */}
        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: bgBtnColor,
            borderRadius: 15,
            paddingHorizontal: 15,
            marginTop: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{ color: blackColor, fontWeight: "600", fontSize: 15 }}
            >
              Pets allowed
            </Text>
            <Switch
              value={draft.petsAllowed}
              onValueChange={(value) => {
                dispatch(updateDraft({ petsAllowed: value }));
              }}
              trackColor={{ false: "#D8CBC0", true: orangeColor }}
              thumbColor="#fff"
              ios_backgroundColor="#D8CBC0"
            />
          </View>

          <View style={{ height: 1, backgroundColor: btnColor }} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{ color: blackColor, fontWeight: "600", fontSize: 15 }}
            >
              Smoking allowed
            </Text>
            <Switch
              value={draft.smokingAllowed}
              onValueChange={(value) => {
                dispatch(updateDraft({ smokingAllowed: value }));
              }}
              trackColor={{ false: "#D8CBC0", true: orangeColor }}
              thumbColor="#fff"
              ios_backgroundColor="#D8CBC0"
            />
          </View>
        </View>
      </ScrollView>

      {/*  section 7*/}
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
            style={{
              fontWeight: "600",
              textAlign: "center",
              color: blackColor,
            }}
          >
            Save draft
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              flex: 2,
              backgroundColor: orangeColor,
              borderRadius: 15,
              paddingVertical: 14,
              justifyContent: "center",
              transform: [{ scale: pressed ? 0.99 : 1 }],
            },
          ]}
          onPress={handleNext}
        >
          <Text
            style={{ fontWeight: "600", textAlign: "center", color: "#fff" }}
          >
            Next: review
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
