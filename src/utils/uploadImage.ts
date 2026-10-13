import { Platform } from "react-native";
import type { ImagePickerAsset } from "expo-image-picker";
import api from "@/config/axiosInstance";
import { apipath } from "@/constant/apiPath";

type UploadSignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
};

export const uploadImage = async (asset: ImagePickerAsset): Promise<string> => {
  const { data: sig } = await api.get<UploadSignature>(apipath.uploadSignature);

  const name = asset.fileName ?? `photo-${Date.now()}.jpg`;
  const type = asset.mimeType ?? "image/jpeg";

  const form = new FormData();
  if (Platform.OS === "web" && asset.file) {
    form.append("file", asset.file);
  } else {
    // React Native's FormData accepts a { uri, name, type } file descriptor
    form.append("file", { uri: asset.uri, name, type } as any);
  }
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  const json = await postForm(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    form,
  );

  return json.secure_url as string;
};

// Expo's fetch rejects RN { uri, name, type } file parts; XMLHttpRequest supports them.
const postForm = (url: string, form: FormData) =>
  new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = () => {
      let json: any = null;
      try {
        json = JSON.parse(xhr.responseText);
      } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && json) {
        resolve(json);
      } else {
        reject(new Error(json?.error?.message ?? "Image upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error while uploading image"));
    xhr.send(form);
  });
