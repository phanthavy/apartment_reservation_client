import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function OwnerStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 100,
      }}
    />
  );
}
