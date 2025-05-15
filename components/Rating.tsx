import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface RatingProps {
  rate: number;
  count: number;
  showCount?: boolean;
  size?: number;
}

export const Rating: React.FC<RatingProps> = ({ 
  rate, 
  count, 
  showCount = true,
  size = 16 
}) => {
  // Round to nearest half
  const roundedRate = Math.round(rate * 2) / 2;
  
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => {
        // Full star
        if (star <= roundedRate) {
          return <Star key={star} size={size} color="#FFD700" fill="#FFD700" />;
        }
        // Half star
        else if (star - 0.5 === roundedRate) {
          return <Star key={star} size={size} color="#FFD700" fill="#FFD700" fillOpacity={0.5} />;
        }
        // Empty star
        return <Star key={star} size={size} color="#FFD700" />;
      })}
      
      {showCount && (
        <Text style={styles.count}>({count})</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});