import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
  size?: number | 'small' | 'large';
  color?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'large', 
  color = '#3B82F6' 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});