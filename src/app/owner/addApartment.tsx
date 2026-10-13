import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import StepHeader from "@/components/ui/StepHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addPhoto,
  MAX_PHOTOS,
  removePhoto,
  resetDraft,
  updateDraft,
} from "@/store/slices/apartment/apartmentSlice";
import { uploadImage } from "@/utils/uploadImage";

const orangeColor = "#C2410C";
const brownColor = "#6B5446";
const blackColor = "#2A1A0F";
const bgBtnColor = "#FFF4EA";
const btnColor = "#FED7AA";
const redColor = "#9A3412";

export default function AddApartment() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const draft = useAppSelector((s) => s.apartment.draft);
  const [showErrors, setShowErrors] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleAddPhotos = async () => {
    const remaining = MAX_PHOTOS - draft.photos.length - uploading;
    if (remaining <= 0) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 0.7,
    });
    if (result.canceled) return;

    const assets = result.assets.slice(0, remaining);
    setUploadError(null);
    setUploading((n) => n + assets.length);

    await Promise.all(
      assets.map(async (asset) => {
        try {
          const url = await uploadImage(asset);
          dispatch(addPhoto(url));
        } catch (error: any) {
          setUploadError(
            error.response?.data?.message ??
              error.message ??
              "Some photos failed to upload",
          );
        } finally {
          setUploading((n) => n - 1);
        }
      }),
    );
  };

  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : "#2A1A0F";

  const inputBorder = (missing: boolean) =>
    showErrors && missing ? redColor : bgBtnColor;

  const handleClose = () => {
    dispatch(resetDraft());
    router.canGoBack() ? router.back() : router.replace("/owner/listings");
  };

  const handleNext = () => {
    if (uploading > 0) {
      setUploadError("Please wait for the photos to finish uploading");
      return;
    }
    if (!draft.title.trim() || !draft.area.trim()) {
      setShowErrors(true);
      return;
    }
    router.push("/owner/rulesAndPrice");
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
          title="Add an apartment"
          step={1}
          icon="close-outline"
          onBack={handleClose}
        />

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
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 15,
          }}
        >
          {draft.photos.map((url) => (
            <View
              key={url}
              style={{ width: "31%", aspectRatio: 1, borderRadius: 15 }}
            >
              <Image
                source={{ uri: url }}
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
                contentFit="cover"
              />
              <Pressable
                onPress={() => dispatch(removePhoto(url))}
                hitSlop={8}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  backgroundColor: "rgba(0,0,0,0.55)",
                  borderRadius: 12,
                  padding: 2,
                }}
              >
                <Ionicons name="close" size={16} color="#fff" />
              </Pressable>
            </View>
          ))}

          {Array.from({ length: uploading }, (_, i) => (
            <View
              key={`uploading-${i}`}
              style={{
                width: "31%",
                aspectRatio: 1,
                borderRadius: 15,
                backgroundColor: bgBtnColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={orangeColor} />
            </View>
          ))}

          {draft.photos.length + uploading < MAX_PHOTOS && (
            <Pressable
              onPress={handleAddPhotos}
              style={({ pressed }) => [
                {
                  width: "31%",
                  aspectRatio: 1,
                  backgroundColor: bgBtnColor,
                  borderWidth: 2,
                  borderColor: orangeColor,
                  borderStyle: "dashed",
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
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
          )}
        </View>
        {uploadError && (
          <Text style={{ color: redColor, marginTop: 8 }}>{uploadError}</Text>
        )}

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
          value={draft.title}
          onChangeText={(text) => dispatch(updateDraft({ title: text }))}
          style={[
            {
              color: "#000",
              backgroundColor: "#fff",
              borderWidth: 2,
              borderColor: inputBorder(!draft.title.trim()),
              borderRadius: 15,
              padding: 15,
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
          value={draft.area}
          onChangeText={(text) => dispatch(updateDraft({ area: text }))}
          style={[
            {
              color: "#000",
              backgroundColor: "#fff",
              borderWidth: 2,
              borderColor: inputBorder(!draft.area.trim()),
              borderRadius: 15,
              padding: 15,
              marginTop: 15,
            },
          ]}
          placeholder="Xaysettha, Vientiane"
        />
        {showErrors && (!draft.title.trim() || !draft.area.trim()) && (
          <Text style={{ color: redColor, marginTop: 8 }}>
            Please fill in the apartment name and area
          </Text>
        )}

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
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colorTheme,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Size (m²)
            </Text>
            <TextInput
              value={draft.sizeM2}
              onChangeText={(text) => dispatch(updateDraft({ sizeM2: text }))}
              keyboardType="numeric"
              style={[
                {
                  color: "#000",
                  backgroundColor: "#fff",
                  borderWidth: 2,
                  borderColor: bgBtnColor,
                  borderRadius: 15,
                  padding: 15,
                  marginTop: 15,
                },
              ]}
              placeholder="68"
            />
          </View>
          {/* section 6 */}
          <View style={{ flex: 1 }}>
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
                onPress={() =>
                  dispatch(updateDraft({ beds: Math.max(0, draft.beds - 1) }))
                }
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
              <Text style={{ color: blackColor, fontWeight: "600" }}>
                {draft.beds}
              </Text>
              <Pressable
                onPress={() => dispatch(updateDraft({ beds: draft.beds + 1 }))}
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
            Next: rules & price
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
