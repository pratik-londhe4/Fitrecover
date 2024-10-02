import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import InhaleExhale from '../../components/InhaleExhale';
import SiteLogo from '../../components/SiteLogo';
import InfoCards from '../../components/InfoCards';
import { Colors } from '../../constants/Colors';
import { saveExhaleData } from '@/utils/ExhaleStorage';

const App: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isInhaleExhale, setIsInhaleExhale] = useState(false);
  const [exhalationDuration, setExhalationDuration] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; status: string } | null>(null);
  const [showInfoCards, setShowInfoCards] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation state

  const handleStart = () => {
    setCountdown(3);
    setFeedback(null);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsInhaleExhale(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleComplete = async (duration: number | null) => {
    setIsInhaleExhale(false);
    setExhalationDuration(duration);

    if (duration !== null) {
      let feedbackMessage: string;
      let status: string;
      if (duration < 30) {
        feedbackMessage = 'Not Fully Recovered';
        status = Colors.light.tabIconDefault; // Soft gray instead of red
      } else if (duration >= 30 && duration < 60) {
        feedbackMessage = 'Recovered Adequately';
        status = '#60a662'; 
      } else {
        feedbackMessage = 'Full Recovery 100%';
        status = Colors.light.tint; // Green
      }
      setFeedback({
        message: feedbackMessage,
        status: status,
      });
      
      await saveExhaleData(duration); // Save the exhalation duration
      fadeIn(); // Trigger animation
    } else {
      setFeedback({ message: 'Inhale/Exhale sequence completed!', status: '#888' });
      fadeIn();
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Use native driver for performance
    }).start();
  };

  const handleProceed = () => {
    setShowInfoCards(false);
  };

  return (
    <View style={styles.container}>
      <SiteLogo />
      <Text style={styles.title}>FitRecover</Text>
      <Text style={styles.tagline}>Measure your CO₂ tolerance for optimal recovery</Text>
      <View style={styles.centeredContent}>
        {showInfoCards ? (
          <InfoCards onProceed={handleProceed} />
        ) : isInhaleExhale ? (
          <InhaleExhale onComplete={handleComplete} />
        ) : countdown !== null ? (
          <Text style={styles.countdownText}>{countdown}</Text>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Tap here to Start</Text>
          </TouchableOpacity>
        )}
        {feedback && (
          <Animated.View style={[styles.feedbackCard, { backgroundColor: feedback.status, opacity: fadeAnim }]}>
            <Text style={styles.exhalationText}>
              CO2 Discard Rate: {exhalationDuration?.toFixed(2)} seconds
            </Text>
            <Text style={styles.feedbackText}>{feedback.message}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.light.text,
  },
  tagline: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  startButton: {
    padding: 15,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  countdownText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: Colors.light.text,
  },
  feedbackCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    elevation: 3,
  },
  exhalationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  feedbackText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default App;
