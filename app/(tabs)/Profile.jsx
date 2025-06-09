import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// const userImg = require("../../assets/images/user.png"); // Use your user image path
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../Firebase/Config";

const { width } = Dimensions.get("window");

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [touchId, setTouchId] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", auth.currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* User Info Card */}
      <View style={styles.userCard}>
        {/* <Image source={userImg} style={styles.userAvatar} /> */}
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarInitials}>
            {userData?.name ? userData.name[0].toUpperCase() : "?"}
          </Text>
        </View>
        <View style={styles.userInfo}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text style={styles.userName}>
                {userData?.name.toUpperCase()}
              </Text>
              <Text style={styles.userEmail}>{userData?.email}</Text>
            </>
          )}
        </View>
      </View>

      {/* Profile Section */}
      <Text style={styles.sectionHeader}>Profile</Text>
      <TouchableOpacity
        style={styles.itemRow}
        activeOpacity={0.7}
        onPress={() => router.push("/personalinfo")}
      >
        <Ionicons name="person" size={22} style={styles.icon} />
        <Text style={styles.itemText}>Personal Data</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          style={styles.arrow}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemRow}
        activeOpacity={0.7}
        onPress={() => router.push("/contactinfo")}
      >
        <Ionicons name="call" size={22} style={styles.icon} />
        <Text style={styles.itemText}>Contact Information</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          style={styles.arrow}
        />
      </TouchableOpacity>

      {/* Preferences Section */}
      <Text style={styles.sectionHeader}>Preferences</Text>
      <View style={styles.itemRow}>
        <Ionicons name="moon" size={22} style={styles.icon} />
        <Text style={styles.itemText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          style={styles.switch}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: "100%",
  },
  // userAvatar: {
  //   width: 54,
  //   height: 54,
  //   borderRadius: 27,
  //   marginRight: 16,
  // },
  avatarFallback: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#e0e7ef",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 14,
    color: "#888",
    marginTop: 18,
    marginBottom: 8,
    fontWeight: "bold",
    paddingLeft: 2,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  icon: {
    width: 30,
    color: "#222",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  arrow: {
    color: "#bbb",
  },
  switch: {
    marginRight: 0,
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
});
