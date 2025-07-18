import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const PolicyViewerScreen = () => {
  const [loading, setLoading] = useState(true);

  const policy = {
    title: 'Internal Audit Manual',
    url: 'https://docs.google.com/viewer?url=https://www.iso.org/files/live/sites/isoorg/files/store/en/PUB100426.pdf&embedded=true',
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading PDF...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>{policy.title}</Text>
      </View> */}

      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: policy.url }}
          style={styles.webView}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={renderLoadingIndicator}
          scalesPageToFit={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingOverlayText}>Loading PDF...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
  },
  loadingOverlayText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
});

export default PolicyViewerScreen;
