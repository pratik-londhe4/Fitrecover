import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import InhaleExhale from '../../components/InhaleExhale'; // Import the new component
import SiteLogo from '../../components/SiteLogo'; // Import SiteLogo
import InfoCards from '../../components/InfoCards'; // Import the InfoCards component

const App: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isInhaleExhale, setIsInhaleExhale] = useState(false);
  const [exhalationDuration, setExhalationDuration] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null); // New state for feedback
  const [showInfoCards, setShowInfoCards] = useState(true); // State to track if info cards should be shown

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

  const handleComplete = (duration: number | null) => {
    setIsInhaleExhale(false);
    setExhalationDuration(duration); // Save the duration for feedback
    // Calculate recovery feedback based on exhalation duration
    if (duration !== null) {
      let feedbackMessage: string;
      if (duration < 30) {
        feedbackMessage = 'No Recovery';
      } else if (duration >= 30 && duration < 60) {
        feedbackMessage = 'Recovered ~80-90%';
      } else if (duration >= 60) {
        feedbackMessage = 'Full Recovery 100%';
      } else {
        feedbackMessage = 'Duration out of range';
      }
      setFeedback(`Exhalation Duration: ${duration.toFixed(2)} seconds. ${feedbackMessage}`);
    } else {
      setFeedback('Inhale/Exhale sequence completed!');
    }
  };

  const handleProceed = () => {
    setShowInfoCards(false); // Hide info cards and show the countdown
  };

  return (
    <View style={styles.container}>
      <SiteLogo />
      <Text style={styles.title}>FitRecover</Text>
      {showInfoCards ? (
        <InfoCards onProceed={handleProceed} /> // Render info cards
      ) : isInhaleExhale ? (
        <InhaleExhale onComplete={handleComplete} /> 
      ) : countdown !== null ? (
        <Text style={styles.countdownText}>{countdown}</Text>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Tap Here to Start</Text>
        </TouchableOpacity>
      )}
      {feedback ? <Text style={styles.feedbackText}>{feedback}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 100,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 5,
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
  feedbackText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;
