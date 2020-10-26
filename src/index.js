import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StatusBar, StyleSheet } from 'react-native';

import api from '../src/services/api';

export default function App() {
    const [repositories, setRepositories] = useState([]);
    
    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

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

    
});
