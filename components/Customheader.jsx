import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import logo from "../assets/images/logo.png";

const Customheader = () => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.userimg} />
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default Customheader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  imageContainer: {
    marginHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  userimg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  searchIcon: {
    padding: 5,
  },
});
