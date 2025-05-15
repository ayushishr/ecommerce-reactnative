import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleAlert as AlertCircle, RefreshCw } from 'lucide-react-native';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  message, 
  onRetry 
}) => {
  return (
    <View style={styles.container}>
      <AlertCircle size={48} color="#FF4B4B" />
      <Text style={styles.errorText}>{message}</Text>
      
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <RefreshCw size={20} color="white" />
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});