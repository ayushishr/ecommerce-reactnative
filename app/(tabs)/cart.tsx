import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '@/context/CartContext';
import { CartItemComponent } from '@/components/CartItemComponent';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import { ShoppingBag } from 'lucide-react-native';

export default function CartScreen() {
  const { cartItems, totalAmount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <EmptyState 
        message="Your cart is empty. Start shopping to add items to your cart."
        buttonTitle="Browse Products"
        icon={<ShoppingBag size={64} color="#9CA3AF" />}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Cart</Text>
        
        {cartItems.map(item => (
          <CartItemComponent key={item.product.id} item={item} />
        ))}
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
        
        <Button 
          title="Checkout" 
          onPress={() => {}} 
          style={styles.checkoutButton} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  clearButtonText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  checkoutButton: {
    flex: 1,
    marginLeft: 16,
  },
});