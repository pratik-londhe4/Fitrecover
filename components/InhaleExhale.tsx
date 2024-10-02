import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const InhaleExhale: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isInhaling, setIsInhaling] = useState(true);
  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 5000, // Inhale for 5 seconds
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 5000, // Exhale for 5 seconds
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Toggle between inhaling and exhaling
        setIsInhaling(prev => !prev);
        if (isInhaling) {
          // Repeat for inhale and exhale
          animate();
        } else {
          // Complete the animation after the second exhale
          onComplete();
        }
      });
    };

    animate();

    return () => {
      scaleValue.stopAnimation();
    };
  }, [isInhaling, scaleValue, onComplete]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      />
      <Text style={styles.instructionText}>
        {isInhaling ? 'Inhale...' : 'Exhale...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#007BFF',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default InhaleExhale;
