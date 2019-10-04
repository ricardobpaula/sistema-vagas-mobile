import React, { useState, useEffect } from 'react';
import { View,AsyncStorage, KeyboardAvoidingView, Platform, Image, StyleSheet, Text, TextInput, TouchableOpacity  } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation  }) {
  const [email, setEmail] = useState('');
  const [tecnologias, setTecnologias] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('usuario').then(usuario => {
      if(usuario) {
        navigation.navigate('List');
      }
    })
  }, []);

  async function handleSubmit(){
    const reponse = await api.post('/usuarios', {
      email
    });

    const { _id } = reponse.data;

    await AsyncStorage.setItem('usuario', _id);
    await AsyncStorage.setItem('tecnologias', tecnologias);

    navigation.navigate('List');

  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS ==='ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}> E-mail: * </Text> 
        <TextInput 
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}> Tecnologias: * </Text> 
        <TextInput 
          style={styles.input}
          placeholder="Digite as tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={tecnologias}
          onChangeText={setTecnologias}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}> Procurar vagas </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
  
});


