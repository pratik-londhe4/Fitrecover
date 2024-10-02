import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const App: React.FC = () => {
  const handleStart = () => {
    
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.logo} /> 
      <Text style={styles.title}>FitRecover</Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Tap Here to Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,  
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  startButton: {
    padding: 15,
    backgroundColor: '#007BFF', 
    borderRadius: 5,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default App;
