import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

function Dot({
  delay,
  color,
  size,
}: Readonly<{ delay: number; color: string; size: number }>) {
  const y = useSharedValue(0);

  useEffect(() => {
    y.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-size, { duration: 300 }),
          withTiming(0, { duration: 300 }),
        ),
        -1,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

export default function LoadingDots({
  color = "#fff",
  size = 7,
}: Readonly<{
  color?: string;
  size?: number;
}>) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 6,
        height: size * 2.5,
        alignItems: "flex-end",
      }}
    >
      <Dot delay={0} color={color} size={size} />
      <Dot delay={150} color={color} size={size} />
      <Dot delay={300} color={color} size={size} />
    </View>
  );
}
