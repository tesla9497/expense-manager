import { Tabs } from "expo-router";
// Components
import { useTheme } from "@/context";
import { TabBar } from "@/components/custom";

export default function TabLayout() {
  const { Theme } = useTheme();
  return (
    <Tabs
      initialRouteName="accounts"
      screenOptions={{
        tabBarActiveTintColor: Theme.color.background.navicon.primary,
        tabBarInactiveTintColor: Theme.color.base.primary,
        tabBarShowLabel: false,
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
