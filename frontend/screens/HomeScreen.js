import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';


export const HomeScreen = ({ navigation }) => {




  const [tarefas, setTarefas] = useState([]);


  useEffect(() => {
    // Função para obter as tarefas do servidor
    const fetchTarefas = async () => {
      try {
        const response = await axios.get("http://10.68.153.106:3000/tarefas/");
        setTarefas(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTarefas();  // Chama a função para buscar as tarefas
  }, [tarefas]);


  const handleDeletar =  async (id) => {

    try {
      const response = await axios.delete(`http://10.68.153.106:3000/tarefas/${id}`)
    } catch (error) {
      
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarefaContainer}>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <View style={styles.botoes}>
              <TouchableOpacity onPress={() => navigation.navigate('Editar', { tarefa: item })}>
                <Text style={styles.botao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletar(item.id)}>
                <Text style={styles.botao}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.botaoAdicionar} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.textoBotaoAdicionar}>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  tarefaContainer: { marginBottom: 16, padding: 12, borderWidth: 1, borderRadius: 8 },
  descricao: { fontSize: 18 },
  status: { fontSize: 14, color: 'gray' },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  botao: { color: 'blue' },
  botaoAdicionar: { backgroundColor: 'blue', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  textoBotaoAdicionar: { color: 'white', fontSize: 16 },
});

export default HomeScreen;
