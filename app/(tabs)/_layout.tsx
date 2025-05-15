import React from 'react';
import { Tabs } from 'expo-router';
import { CartProvider } from '@/context/CartContext';
import { Chrome as Home, ShoppingCart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F9FAFB',
          },
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Products',
            tabBarLabel: 'Products',
            tabBarIcon: ({ color, size }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <ShoppingCart size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </CartProvider>
  );
}