import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import YouTubeVideoCard from '@/components/YouTubeVideoCard';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="bed" style={styles.headerImage} />}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.titleText} type="title">FitRecover</ThemedText>
      </ThemedView>

      {/* App Description */}
      <ThemedText style={styles.sectionText}>
        FitRecover is a wellness app designed to track and enhance your CO₂ tolerance, helping you gauge recovery from physical activity. By performing interactive breathing exercises, the app measures your exhale duration and gives feedback if you've fully recovered or not.
      </ThemedText>

      {/* GitHub Link */}
      <Collapsible title="GitHub Repository">
        <ThemedText>
          You can view the full source code of the FitRecover app on GitHub: 
        </ThemedText>
        <ExternalLink href="https://github.com/pratik-londhe4/Fitrecover">
          <ThemedText type="link">GitHub Repository</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Author Info */}
      <Collapsible title="Author">
        <ThemedText>
          FitRecover was developed by <ThemedText type="defaultSemiBold">Pratik Londhe</ThemedText>
        </ThemedText>
      </Collapsible>

      {/* Andrew Huberman Video */}
	  <Collapsible title="Inspiration - Andrew Huberman on CO₂ Tolerance Test">
  <ThemedText>
    The app draws inspiration from Andrew Huberman's discussion about the well-known CO₂ tolerance test, which is crucial for understanding recovery from physical exertion. The insights from this talk informed the design of FitRecover, incorporating interactive breathing exercises to help users gauge their recovery status.
  </ThemedText>
  <YouTubeVideoCard />
		  </Collapsible>
		 
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#4caf50',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
	  gap: 8,
	textAlign: 'center',
	
	},
	titleText: {
	fontSize: 28,
	fontWeight: 'bold',
	color: '#4caf50',
	},
  sectionText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
});
