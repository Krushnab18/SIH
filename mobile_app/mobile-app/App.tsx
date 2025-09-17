// mobile-app/App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// This is your computer's IP address from the command you just ran.
const MY_LOCAL_HOST_URL = 'http://192.168.1.126:5000';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        style={styles.webview}
        source={{ uri: MY_LOCAL_HOST_URL }}
        // This log will show any connection errors in your terminal
        onError={(event) => {
          console.error(`WebView Error: ${event.nativeEvent.description}`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // This adds the correct padding at the top so your app isn't hidden by the phone's status bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  webview: {
    flex: 1,
  },
});
