import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductCard = ({ item, id }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.productCard,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.9}
        onPress={() => router.push(`/product/${id}`)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.productPrice}>${item.price}</Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating?.rate || "N/A"}</Text>
            <Text style={styles.ratingCount}>({item.rating?.count || 0})</Text>
          </View>

          {/* ✅ Add to Cart Button */}
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push(`/product/${id}`)}
          >
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  ratingCount: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  imageContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productImage: {
    width: "80%",
    height: "100%",
  },
  productInfo: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    color: "#444",
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    color: "#333",
  },
  ratingCount: {
    marginLeft: 4,
    color: "#888",
  },
  cartButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
