import { Stack, usePathname } from "expo-router";
import React from "react";
import Customheader from "../components/Customheader";

const _layout = () => {
  const pathname = usePathname();
  const hideHeaderOn = ["/personalinfo", "/contactinfo", "/login", "/signup"];
  const showCustomHeader = !hideHeaderOn.includes(pathname);

  return (
    <>
      {showCustomHeader && <Customheader />}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Search" options={{ headerShown: false }} />
        <Stack.Screen name="Setting" options={{ headerShown: false }} />
        <Stack.Screen name="Cart" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen
          name="personalinfo"
          options={{ headerShown: true, title: "Personal Info" }}
        />
        <Stack.Screen
          name="contactinfo"
          options={{ headerShown: true, title: "Contact Info" }}
        />
      </Stack>
    </>
  );
};

export default _layout;
