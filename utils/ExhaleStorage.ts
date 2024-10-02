import AsyncStorage from '@react-native-async-storage/async-storage';

// Save exhalation duration with date and time
export const saveExhaleData = async (exhaleTime: number) => {
  try {
    const now = new Date();
    const dateTime = now.toISOString(); // Format as YYYY-MM-DDTHH:mm:ss.sssZ (ISO format)
    
    // Retrieve existing data
    const currentData = await AsyncStorage.getItem('exhaleData');
    const exhaleData = currentData ? JSON.parse(currentData) : {};

    // Check if there's an entry for today's date
    const today = dateTime.split('T')[0]; // Extract the date part (YYYY-MM-DD)
    if (!exhaleData[today]) {
      exhaleData[today] = [];
    }

    // Append new entry with timestamp and exhale duration
    exhaleData[today].push({ dateTime, exhaleTime });

    // Save the updated exhale data
    await AsyncStorage.setItem('exhaleData', JSON.stringify(exhaleData));
  } catch (error) {
    console.error('Error saving exhale data:', error);
  }
};

// Retrieve exhalation data
export const getExhaleData = async () => {
  try {
    const currentData = await AsyncStorage.getItem('exhaleData');
    return currentData ? JSON.parse(currentData) : {};
  } catch (error) {
    console.error('Error retrieving exhale data:', error);
    return {};
  }
};
