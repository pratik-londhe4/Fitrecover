import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors'; // Adjust the path accordingly
import { getExhaleData } from '../../utils/ExhaleStorage'; // Make sure this path points to your storage functions

const History = () => {
  const [historyData, setHistoryData] = useState<{ date: string; dateTime: string; exhaleSeconds: number }[]>([]);

  useEffect(() => {
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
        console.error('Error fetching exhale data:', error);
      }
    };

    fetchExhaleData();
  }, []);

  // Function to format dateTime to show date and time (HH:MM)
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDate = date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Zero-pad minutes

    return `${formattedDate} ${hours}:${minutes}`; // Combine date and time
  };

  const renderItem = ({ item }: { item: { date: string; dateTime: string; exhaleSeconds: number } }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.dateTime}</Text>
      <Text style={styles.exhaleSeconds}>{item.exhaleSeconds} seconds</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exhale History</Text>
      {historyData.length === 0 ? (
        <Text style={styles.noDataText}>No exhale data available.</Text>
      ) : (
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.dateTime} // Use dateTime as the key
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer} // Apply padding to the list container
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
	marginTop: 64,
    backgroundColor: Colors.light.background, // Adjust based on theme
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.text,
    textAlign: 'center', // Center align the title
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15, // Increased padding for better spacing
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Elevation for Android
  },
  date: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500', // Slightly bolder text
  },
  exhaleSeconds: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: '500', // Slightly bolder text
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.light.text,
    marginTop: 20, // Add margin to separate from title
  },
  listContainer: {
    paddingBottom: 20, // Add padding to the bottom of the list
  },
});

export default History;
