import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types';

interface CartItemProps {
  item: CartItem;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(product.id, quantity - 1)}
          >
            <Minus size={16} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus size={16} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeFromCart(product.id)}
          >
            <Trash2 size={18} color="#FF4B4B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 6,
  },
});