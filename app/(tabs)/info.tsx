import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="heart" style={styles.headerImage} />}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">FitRecover</ThemedText>
      </ThemedView>

      {/* App Description */}
      <ThemedText style={styles.sectionText}>
        FitRecover is a wellness app designed to track and enhance your CO₂ tolerance, helping you gauge recovery from physical activity. By performing interactive breathing exercises, the app measures your exhale duration and gives feedback to assist in recovery optimization.
      </ThemedText>

      {/* GitHub Link */}
      <Collapsible title="GitHub Repository">
        <ThemedText>
          You can view the full source code of the FitRecover app on GitHub: 
        </ThemedText>
        <ExternalLink href="[Insert GitHub Link Here]">
          <ThemedText type="link">GitHub Repository</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Author Info */}
      <Collapsible title="Author">
        <ThemedText>
          FitRecover was developed by <ThemedText type="defaultSemiBold">[Author Name]</ThemedText>, inspired by a commitment to fitness recovery and wellness technology.
        </ThemedText>
      </Collapsible>

      {/* Andrew Huberman Video */}
      <Collapsible title="Inspiration - Andrew Huberman's CO₂ Tolerance Talk">
        <ThemedText>
          The app takes inspiration from Andrew Huberman's discussion on CO₂ tolerance and its role in recovery. Watch the video to learn more about the science behind this concept:
        </ThemedText>
        <ExternalLink href="https://www.youtube.com/watch?v=NKoPdzN1ydg">
          <ThemedText type="link">Watch Andrew Huberman's Video</ThemedText>
        </ExternalLink>
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
  },
  sectionText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
});
