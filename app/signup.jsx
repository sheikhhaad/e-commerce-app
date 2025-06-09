import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import logo from "../assets/images/logo.png"; // Uncomment and set your logo
import { auth } from "../Firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/Config";
import { router } from "expo-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Sign up successful!");
        router.push("/login");
      })
      .catch((error) => {
        console.log(error.code);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* <Image source={logo} style={styles.logo} /> */}
        <Ionicons name="person-add" size={80} color="#007bff" />
      </View>
      <Text style={styles.title}>Sign Up</Text>
      {/* Error Message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="person"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {/* Phone Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="call" size={20} color="#888" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      {/* Address Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="location"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#888"
          value={address}
          onChangeText={setAddress}
        />
      </View>
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword((prev) => !prev)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Link to Login */}
      <TouchableOpacity style={styles.loginLink}>
        <Text
          style={styles.loginLinkText}
          onPress={() => router.push("/login")}
        >
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 24,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: "100%",
    maxWidth: 400,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#222",
  },
  signupButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    marginTop: 8,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 18,
  },
  loginLinkText: {
    color: "#007bff",
    fontSize: 15,
    textAlign: "center",
  },
});
