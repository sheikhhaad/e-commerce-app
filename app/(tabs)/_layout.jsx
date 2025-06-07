import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import Customheader from "../../components/Customheader";

const Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#e53935",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "index") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={28}
                color={color}
              />
            );
          }
          if (route.name === "Cart") {
            return (
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 35,
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -30,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 8,
                }}
              >
                <Ionicons name="cart" size={32} color={color} />
              </View>
            );
          }
          if (route.name === "Search") {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={28}
                color={color}
              />
            );
          }
          if (route.name === "Setting") {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={28}
                color={color}
              />
            );
          }
        },
      })}
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
