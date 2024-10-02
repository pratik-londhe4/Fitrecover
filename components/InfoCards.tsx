import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InfoCards: React.FC<{ onProceed: () => void }> = ({ onProceed }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "CO2 Tolerance Test",
      content: "This test helps you measure your CO2 tolerance level and recovery after workouts.",
    },
    {
      title: "Instructions",
      content: "1. Inhale deeply through your nose.\n2. Exhale slowly through your mouth.",
    },
    {
      title: "Usage",
      content: "Use this test to track your recovery and improve your breathing efficiency over time.",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      onProceed(); // Call onProceed when reaching the last step
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{steps[currentStep].title}</Text>
      <Text style={styles.card}>{steps[currentStep].content}</Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentStep < steps.length - 1 ? 'Next' : 'OK'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default InfoCards;
