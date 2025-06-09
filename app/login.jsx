import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
// import logo from "../assets/images/logo.png"; // Uncomment and set your logo path
import { auth } from "../Firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/(tabs)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    alert("Login successful!");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* <Image source={logo} style={styles.logo} /> */}
        <Ionicons name="person-circle" size={80} color="#007bff" />
      </View>
      <Text style={styles.title}>Login</Text>
      {/* Error Message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      {/* Link to Signup */}
      <TouchableOpacity style={styles.signupLink}>
        <Text
          style={styles.signupLinkText}
          onPress={() => router.push("/signup")}
        >
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

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
  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    color: "#007bff",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    marginTop: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 18,
  },
  signupLinkText: {
    color: "#007bff",
    fontSize: 15,
    textAlign: "center",
  },
});
