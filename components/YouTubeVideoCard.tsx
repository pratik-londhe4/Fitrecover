import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemedText } from '@/components/ThemedText';

const YouTubeVideoCard = () => {
  const videoId = 'XLr2RKoD-oY'; // The video ID
  const startTime = 5193; // Start time in seconds

  return (
    <View style={styles.container}>
      <WebView
        style={styles.video}
        source={{ uri: `https://www.youtube.com/embed/${videoId}?start=${startTime}` }} // Modified URL
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  video: {
    width: '100%',
    height: 200, // Adjust the height as needed
  },
});

export default YouTubeVideoCard;
