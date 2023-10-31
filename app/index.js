import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const App = () => {
  const [links, setLinks] = useState([
    {
      label: "Hamburgueres",
      destination: "/p1",
    },
    {
      label: "Refrigerantes",
      destination: "/p2",
    },
  ]);

  return (
    <View style={styles.container}>
        <Text style={styles.Text}>Escolha o tipo de produto</Text>
      <FlatList
        data={links}
        renderItem={({ item }) => (
          <Link href={item.destination}>
            <Text style={styles.Text}>{item.label}</Text>
          </Link>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
      padding:24
    }, Text: {
        fontSize: 24,
    marginBottom: 20,
    }
  });
  

export default App;
