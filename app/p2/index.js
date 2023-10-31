import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import axios from "axios";

const { width } = Dimensions.get("window");

const App = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.11:3000/produtos?categoria_id=2")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderItem = (data) => {
    return (
      <View key={data.id} style={styles.cardContainer}>
        <View style={styles.cardWrapper}>
          <Image style={styles.card} source={{ uri: data.imagemUrl }} />
          <View style={styles.cornerLabel}>
            <Text style={styles.cornerLabelText}>Preço: {data.preco}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={produtos}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    width: width * 0.9,
    height: width * 1.5,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
    backgroundColor: "#2ECC40"
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default App;
