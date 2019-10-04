import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import api from '../services/api';

 function VagaList( { tec, navigation } ) {
  const [vagas, setVagas] = useState([]);
  
  useEffect(() => {
    async function loadVagas() {
       const response = await api.get('/vagas', {
        params: { tecnologia: tec }
      })
      setVagas(response.data);
    }

    loadVagas();

  }, []);

  
  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam<Text style={styles.bold}> { tec } </Text> </Text>
      <FlatList 
        style={styles.list}
        data={vagas}
        keyExtractor={vaga => vaga._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.imagem} source={{ uri: item.imagem_url}} />
            <Text style={styles.empresa}>{item.empresa}</Text>
            <Text style={styles.preco}>{item.valor ? `R$${item.valor}/hora` : 'Valor não informado'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}> Canditar-se </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },

  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold'
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  imagem: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  empresa: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  valor: {
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default withNavigation(VagaList);