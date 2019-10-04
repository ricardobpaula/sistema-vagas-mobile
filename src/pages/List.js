import React, { useState, useEffect } from 'react';
import sotcketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView ,Image,StyleSheet, AsyncStorage } from 'react-native';

import VagaList from '../components/VagaList';

import logo from '../assets/logo.png';

export default function List() {
  const [tecnologias, setTecnologias] = useState([]);

  useEffect(() =>{
    AsyncStorage.getItem('usuario').then(usuario_id=>{
      const socket = sotcketio('http://192.168.56.1:3333', {
        query: { usuario_id }
      });

      socket.on('reserva_response', reserva => {
        Alert.alert(`Você foi ${reserva.aprovada ? 'aceito' : 'recusado'} para a vaga em ${reserva.vaga.empresa} para o dia ${reserva.data}`);
        
      })
    })
  },[])

  useEffect(() => {
    AsyncStorage.getItem('tecnologias').then(storagedTechs => {
      const tecArray = storagedTechs.split(',').map(tech => tech.trim());

      setTecnologias(tecArray);
    });
  },[]);


  return (
   <SafeAreaView style={styles.container}>
     <Image style={styles.logo} source={logo}/>

     <ScrollView>
     {tecnologias.map(tec => <VagaList key={tec} tec={tec} />)}
     </ScrollView>
   </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  logo: {
    height: 32,
    resizeMode: "contain",
  }

});