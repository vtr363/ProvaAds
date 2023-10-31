import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [refrigerantes, setRefrigerantes] = useState([]);
  const [hamburgueres, setHamburgueres] = useState([]);
  const [selectedRefrigerante, setSelectedRefrigerante] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.1.11:3000/produtos?categoria_id=2")
      .then((response) => {
        setRefrigerantes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://192.168.1.11:3000/produtos?categoria_id=1")
      .then((response) => {
        setHamburgueres(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRefrigeranteChange = (event) => {
    setSelectedRefrigerante(event.target.value);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Image
          source={{ uri: item.imagemUrl }}
          style={styles.imagem}
        />
        <Text style={styles.preco}>R$ {item.preco}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedRefrigerante}
        onValueChange={(value) => setSelectedRefrigerante(value)}
      >
        <Picker.Item label={"Escolha um refrigerante"} value={""} />
        {refrigerantes.map((refrigerante) => (
          <Picker.Item key={refrigerante.id} label={refrigerante.nome} value={refrigerante.id} />
        ))}
      </Picker>
      <FlatList
        data={hamburgueres}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  item: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descricao: {
    fontSize: 16,
  },
  imagem: {
    width: 100,
    height: 100,
  },
  preco: {
    fontSize: 16,
  },
});

export default App;
