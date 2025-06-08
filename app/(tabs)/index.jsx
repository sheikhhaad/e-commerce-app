import { useFocusEffect } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import useFetch from "../Hooks/useFetch";

const index = () => {
  const [data, loading, error] = useFetch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Reset animation when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      if (!loading && data) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
      return () => {
        fadeAnim.setValue(0);
      };
    }, [loading, data])
  );

  const renderItem = ({ item, index }) => (
    <ProductCard item={item} index={index} id={item.id} fadeAnim={fadeAnim} />
  );

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error loading products</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          removeClippedSubviews={false}
        />
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  productList: {
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
  },
});
