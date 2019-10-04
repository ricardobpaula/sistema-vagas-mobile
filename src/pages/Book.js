import React, { useState } from 'react';
import { Text, SafeAreaView,Alert, AsyncStorage, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const [data, setData] = useState('');
  
  const id = navigation.getParam('id'); 

  async function handleSubmit(){
    const usuario_id = await AsyncStorage.getItem('usuario');

    await api.post(`/vagas/${id}/reservas`,{
      data,
    }, {
      headers: { usuario_id }
    })
    Alert.alert('Solicitação para a vaga enviada');

    navigation.navigate('List');

  };

  function handleCancell(){
    navigation.navigate('List');

  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}> Data de disponibilidade: * </Text> 
        <TextInput 
          style={styles.input}
          placeholder="Digite a data"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={data}
          onChangeText={setData}
        />
         <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}> Enviar </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancell} style={[styles.button, styles.buttonCancell]}>
          <Text style={styles.buttonText}> Cancelar </Text>
        </TouchableOpacity>
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 30,

  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2 
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
    buttonCancell: {
    marginTop: 10,
    backgroundColor: '#ccc',
  }
  ,
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
