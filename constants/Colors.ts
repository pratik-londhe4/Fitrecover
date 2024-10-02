/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

const tintColorLight = '#4caf50'; // Green for positivity and health
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#333', // Darker text for better readability
    background: '#f5f5f5', // Soft light background
    tint: tintColorLight, // Green tint
    icon: '#555', // Slightly darker gray for icons
    tabIconDefault: '#888', // Gray for unselected tabs
    tabIconSelected: tintColorLight, // Green for selected tab
  },
  dark: {
    text: '#ECEDEE', // Light text for dark background
    background: '#151718', // Dark background
    tint: tintColorDark, // White for dark mode
    icon: '#9BA1A6', // Light gray for icons
    tabIconDefault: '#9BA1A6', // Light gray for unselected tabs
    tabIconSelected: tintColorDark, // White for selected tab
  },
};
