import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export const CadastroScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleAdicionar = async () => {
    // Verifica se os campos estão vazios
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;  // Não faz nada se algum campo estiver vazio
    }

    const tarefa = { titulo, descricao };

    try {
      const response = await axios.post('http://10.68.153.106:3000/tarefas/', {
        titulo,
        descricao
      });

      if (response.status === 201) {
        console.log("Tarefa Adicionada com sucesso!");
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Título da Tarefa"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da tarefa"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity style={styles.botao} onPress={handleAdicionar}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
  botao: { backgroundColor: 'blue', padding: 16, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: 'white', fontSize: 16 },
});
