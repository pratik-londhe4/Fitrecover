import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

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
      content: "Use this test in the morning right after waking up",
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
    <View style={styles.modalContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.cardContent}>{steps[currentStep].content}</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep < steps.length - 1 ? 'Next' : 'OK'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    width: '80%',
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  nextButton: {
    padding: 15,
    backgroundColor: Colors.light.tint, 
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default InfoCards;
