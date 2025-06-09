import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../Firebase/Config";

const PersonalInfo = () => {
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

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{userData?.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userData?.email}</Text>
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  label: { fontWeight: "bold", fontSize: 16, marginTop: 16 },
  value: { fontSize: 16, color: "#333", marginTop: 4 },
});
