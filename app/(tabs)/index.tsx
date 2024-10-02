import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import InhaleExhale from '../../components/InhaleExhale'; // Import the new component

const App: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isInhaleExhale, setIsInhaleExhale] = useState(false);

  const handleStart = () => {
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
      setIsInhaleExhale(true); // Start inhale/exhale sequence
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleComplete = () => {
    // Handle the completion of the inhale/exhale animation
    setIsInhaleExhale(false);
    // Navigate to the next step or show recovery feedback
    alert('Inhale/Exhale sequence completed!'); // Placeholder
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
      <Text style={styles.title}>FitRecover</Text>
      {isInhaleExhale ? (
        <InhaleExhale onComplete={handleComplete} /> // Render inhale/exhale component
      ) : countdown !== null ? (
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
  countdownText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default App;
