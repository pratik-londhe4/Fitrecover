import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const App: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleStart = () => {
    // Start the countdown from 3
    setCountdown(3);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (countdown === 0) {
      
      setCountdown(null);
      
    }

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [countdown]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.logo} /> {/* Replace with your logo */}
      <Text style={styles.title}>FitRecover</Text>
      {countdown !== null ? (
        <Text style={styles.countdownText}>{countdown}</Text>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Tap Here to Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background color
  },
  logo: {
    width: 100,  // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  startButton: {
    padding: 15,
    backgroundColor: '#007BFF', // Button color
    borderRadius: 5,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  countdownText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default App;
