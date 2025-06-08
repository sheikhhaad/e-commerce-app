import { Tabs } from "expo-router";
import Customheader from "../../components/Customheader";
import CustomTabBar from "../../components/CustomTabBar";

const Layout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => <Customheader />,
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen name="Cart" options={{ tabBarLabel: "Cart" }} />
      <Tabs.Screen name="Search" options={{ tabBarLabel: "Search" }} />
      <Tabs.Screen name="Setting" options={{ tabBarLabel: "Setting" }} />
    </Tabs>
  );
};

export default Layout;
