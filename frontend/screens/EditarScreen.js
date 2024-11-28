import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export const EditarScreen = ({ route, navigation }) => {
  const { tarefa } = route.params;
  const [titulo, setTitulo] = useState(tarefa.titulo)
  const [descricao, setDescricao] = useState(tarefa.descricao);

  const handleSalvar = async () => {
    // Lógica para atualizar a tarefa
    try {
      const response = await axios.put(`http://10.68.153.106:3000/tarefas/${tarefa.id}`, {
        descricao,
        titulo
      })

      if (response.status === 201) {
        console.log("Tarefa Adicionada com sucesso!")
        navigation.goBack();
      }
    } catch (error) {

    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição da tarefa"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Titulo da Tarefa"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
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


