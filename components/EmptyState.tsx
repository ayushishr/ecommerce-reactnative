import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { Button } from './Button';
import { router } from 'expo-router';

interface EmptyStateProps {
  message: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  buttonTitle = 'Browse Products',
  onButtonPress,
  icon,
}) => {
  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      router.push('/');
    }
  };

  return (
    <View style={styles.container}>
      {icon || <ShoppingCart size={64} color="#9CA3AF" />}
      <Text style={styles.message}>{message}</Text>
      {buttonTitle && (
        <Button
          title={buttonTitle}
          onPress={handleButtonPress}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});