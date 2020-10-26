import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

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
     <View style={styles.container}>
    {repositories.map(repository => (
    <Text style={styles.repository} key={repository.id}>{repository.title}</Text>))}

     </View>
     </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent:'center',
        alignItems: "center"
    },

    repository: {
        color:'#FFF',
        fontSize: 30,
        

    },

    
});
