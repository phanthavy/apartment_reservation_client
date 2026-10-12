import { store, useAppDispatch } from "@/store";
import { loadAuth } from "@/store/slices/auth/authSlice";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

function RootStack() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(loadAuth()).finally(() => {
      setReady(true);
      SplashScreen.hideAsync();
    });
  }, []);
  
  if (!ready) return null;

  const backgroundTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFF8F3",
    },
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : backgroundTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 300,
          gestureEnabled: true,
        }}
      />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}
