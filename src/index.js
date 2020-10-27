import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../src/services/api';

export default function App() {
    const [repositories, setRepositories] = useState([]);
    
    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        const response = await api.post('repositories', {
            title: `novo projeto ${Date.now()}`,
            owner: 'juka'
        });

        const repository = response.data;
        setRepositories([ ...repositories, repository]);

    }



    return(
    <>
     <StatusBar barStyle="light-content"/>

     <SafeAreaView style={styles.container}>
        <FlatList           
           data={repositories}
           keyExtractor={repository => repository.id}
           renderItem={({ item: repository}) => (
           <Text style={styles.repository}>{repository.title}</Text>
           )}     
        />

        <TouchableOpacity 
           activeOpacity={0.8} 
           style={styles.button}
           onPress={handleAddRepository}
        >
         <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity> 


     </SafeAreaView>    
     </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        
    },

    repository: {
        color:'#FFF',
        fontSize: 30,
        

    },
    button: {
        backgroundColor: '#FFF',
        margin:20,
        height:50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight:'bold',
        fontSize: 16,
    }

    
});
