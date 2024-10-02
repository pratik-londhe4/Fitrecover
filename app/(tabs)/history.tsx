import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { Colors } from '@/constants/Colors'; 
import { getExhaleData, clearExhaleData } from '../../utils/ExhaleStorage';

const History = () => {
  const [historyData, setHistoryData] = useState<{ date: string; dateTime: string; exhaleSeconds: number }[]>([]);

  // Fetch exhale data on load
  const fetchExhaleData = async () => {
    try {
      const data = await getExhaleData();
      const formattedData = [];

      // Loop through each date and its corresponding entries
      Object.keys(data).forEach((date) => {
        const entries = data[date].map((entry: { dateTime: string; exhaleTime: number }) => ({
          date,
          dateTime: formatDateTime(entry.dateTime), // Format the timestamp to display date and time
          exhaleSeconds: entry.exhaleTime,
        }));
        formattedData.push(...entries);
      });

      setHistoryData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to clear exhale history and remove it from local storage
  const handleResetHistory = async () => {
    try {
      await clearExhaleData(); // Clear the stored data in AsyncStorage
      Alert.alert('History Reset', 'All test history has been cleared.');
      setHistoryData([]); // Clear the state to remove data from the UI
    } catch (error) {
      Alert.alert('Error', 'Unable to reset history. Please try again.');
    }
  };

  // Refresh the history data
  const handleRefreshHistory = () => {
    fetchExhaleData();
  };

  // Format the dateTime to show date and time (HH:MM)
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDate = date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Zero-pad minutes

    return `${formattedDate} ${hours}:${minutes}`; // Combine date and time
  };

  useEffect(() => {
    fetchExhaleData(); // Fetch data on initial load
  }, []);

  const renderItem = ({ item }: { item: { date: string; dateTime: string; exhaleSeconds: number } }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.dateTime}</Text>
      <Text style={styles.exhaleSeconds}>{item.exhaleSeconds} seconds</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitRecover History</Text>
      {historyData.length === 0 ? (
        <Text style={styles.noDataText}>No data available.</Text>
      ) : (
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.dateTime} // Use dateTime as the key
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer} 
        />
      )}

      
        <View style={styles.buttonContainer}>
		{historyData.length > 0 && (<Button title="Reset History" color={Colors.light.tint} onPress={handleResetHistory} /> )}
          <Button title="Refresh" color={Colors.light.tint} onPress={handleRefreshHistory} /> 
        </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 64,
    backgroundColor: Colors.light.background, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.text,
    textAlign: 'center', 
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15, 
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500',
  },
  exhaleSeconds: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: '500', 
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.light.text,
    marginTop: 20, 
  },
  listContainer: {
    paddingBottom: 20, 
  },
  buttonContainer: {
    marginTop: 20, 
    flexDirection: 'row',
    justifyContent: 'space-around', 
  },
});

export default History;
