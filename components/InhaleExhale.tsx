import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors'; 

const InhaleExhale: React.FC<{ onComplete: (exhalationDuration: number | null) => void }> = ({ onComplete }) => {
  const [sequenceCount, setSequenceCount] = useState(1); // Track the number of sequences completed
  const [isInhaling, setIsInhaling] = useState(true);
  const [scaleValue] = useState(new Animated.Value(0));
  const [isFifthCycle, setIsFifthCycle] = useState(false);
  const [exhalationStartTime, setExhalationStartTime] = useState<number | null>(null);
  const [exhaleActive, setExhaleActive] = useState(false); // To track if exhale is active

  useEffect(() => {
    if (sequenceCount < 5) {
      const inhaleDuration = (sequenceCount === 4) ? 7000 : 5000; // 7 seconds for the 5th inhale, 5 seconds for others

      const animateInhale = () => {
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: inhaleDuration,
          useNativeDriver: true,
        }).start(() => {
          setIsInhaling(false); // Prepare for exhale
          animateExhale();
        });
      };

      const animateExhale = () => {
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 5000, // 5 seconds for exhale
          useNativeDriver: true,
        }).start(() => {
          setIsInhaling(true); // Prepare for next inhale
          setSequenceCount(prev => prev + 1);
        });
      };

      animateInhale(); // Start the inhale animation
    } else {
      // If it's the 5th inhale/exhale
      setIsFifthCycle(true);
      animateFifthCycle(); // Automatically start the 5th inhale
    }

    return () => {
      scaleValue.stopAnimation(); // Cleanup on unmount
    };
  }, [sequenceCount]);

  const animateFifthCycle = () => {
    const inhaleDuration = 7000; // 7 seconds for the 5th inhale

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: inhaleDuration,
      useNativeDriver: true,
    }).start(() => {
      // Mark the fifth cycle as active
      setIsInhaling(true); // Keep inhaling state true for the fifth inhale
    });
  };

  const handleExhaleStart = () => {
    setExhalationStartTime(Date.now()); // Start timing for exhalation
    setExhaleActive(true); // Set exhale to active
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 20000, // 5 seconds for exhale
      useNativeDriver: true,
    }).start(() => {
      setIsInhaling(false); // Prepare for next inhale
    });
  };

  const handleExhaleEnd = () => {
    if (exhalationStartTime) {
      const duration = (Date.now() - exhalationStartTime) / 1000; // Calculate exhalation duration
      onComplete(duration); // Call the completion function with exhalation duration
    }
    setExhaleActive(false); // Reset exhaling state
  };

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
        {isFifthCycle ? (exhaleActive ? 'Exhale as slow as possible...' : 'Inhale as full as possible...') : (isInhaling ? 'Inhale...' : 'Exhale...')}
      </Text>
      {(isFifthCycle && !exhaleActive) ? (
        <TouchableOpacity style={styles.startButton} onPress={handleExhaleStart}>
          <Text style={styles.startButtonText}>Tap when starting to Exhale</Text>
        </TouchableOpacity>
      ) : null}
      {exhaleActive ? (
        <TouchableOpacity style={styles.startButton} onPress={handleExhaleEnd}>
          <Text style={styles.startButtonText}>Click here when you can not exhale anymore</Text>
        </TouchableOpacity>
      ) : null}
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
    backgroundColor: Colors.light.tint, // Use the constant color
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  instructionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light.tint, // Use the constant color
    borderRadius: 5,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default InhaleExhale;
