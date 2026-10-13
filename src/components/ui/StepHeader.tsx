import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const orangeColor = "#C2410C";
const brownColor = "#6B5446";
const blackColor = "#2A1A0F";
const btnColor = "#FED7AA";

const DURATION = 350;

type StepHeaderProps = {
  title: string;
  step: number;
  total?: number;
  icon?: "close-outline" | "chevron-back-outline";
  onBack: () => void;
};

function Bar({ fill }: { fill: SharedValue<number> | number }) {
  const style = useAnimatedStyle(() => ({
    width: `${(typeof fill === "number" ? fill : fill.value) * 100}%`,
  }));

  return (
    <View
      style={{
        flex: 1,
        height: 5,
        borderRadius: 3,
        backgroundColor: btnColor,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[{ height: "100%", backgroundColor: orangeColor }, style]}
      />
    </View>
  );
}

export default function StepHeader({
  title,
  step,
  total = 3,
  icon = "chevron-back-outline",
  onBack,
}: StepHeaderProps) {
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? "#ffffff" : blackColor;

  // fill of this step's bar, animated in when arriving from the previous step
  const current = useSharedValue(0);
  // fill of the next step's bar, animated out when returning from the next step
  const leaving = useSharedValue(0);
  const hasFocused = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!hasFocused.current) {
        hasFocused.current = true;
        current.value = withTiming(1, { duration: DURATION });
      } else {
        leaving.value = 1;
        leaving.value = withTiming(0, { duration: DURATION });
      }
    }, []),
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
      <Pressable
        onPress={onBack}
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
        <Ionicons name={icon} size={28} color={blackColor} />
      </Pressable>

      <View style={{ flex: 1 }}>
        <Text style={{ color: colorTheme, fontSize: 22, fontWeight: "600" }}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
          {Array.from({ length: total }, (_, i) => {
            const index = i + 1;
            if (index < step) return <Bar key={i} fill={1} />;
            if (index === step) return <Bar key={i} fill={current} />;
            if (index === step + 1) return <Bar key={i} fill={leaving} />;
            return <Bar key={i} fill={0} />;
          })}
        </View>
      </View>

      <Text style={{ color: brownColor, fontWeight: "600" }}>
        {step} of {total}
      </Text>
    </View>
  );
}
