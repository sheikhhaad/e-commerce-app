import { useFocusEffect } from "@react-navigation/native";
import React, { use, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import img1 from "../../assets/images/product1.jpg";
import img2 from "../../assets/images/product2.webp";
import img3 from "../../assets/images/product3.avif";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import useFetch from "../Hooks/useFetch";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import { router } from "expo-router";



const { width } = Dimensions.get("window");

const carouselData = [{ img: img1 }, { img: img2 }, { img: img3 }];

const index = () => {
  const [data, loading, error] = useFetch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useState(null);

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;
        // ...
      } else {
        setUser(null);
        router.push("/login");
      }
    });
    
  })



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
          ListHeaderComponent={
            <>
              <SearchBar />
              <View style={styles.carouselContainer}>
                <Carousel
                  width={width - 20}
                  height={220}
                  autoPlay
                  data={carouselData}
                  scrollAnimationDuration={1000}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.carouselItem,
                        {
                          width: width * 0.85,
                          height: 200,
                          alignSelf: "center",
                        },
                      ]}
                    >
                      <Image
                        source={item.img}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                  style={{ alignSelf: "center" }}
                />
              </View>
            </>
          }
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
  carouselContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  carouselItem: {
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  carouselImage: {
    width: "90%",
    height: "90%",
  },
  header: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
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
