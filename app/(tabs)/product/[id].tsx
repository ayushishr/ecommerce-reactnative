import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  useWindowDimensions,
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { fetchProductById } from '@/services/api';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/Button';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { Rating } from '@/components/Rating';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, cartItems } = useCart();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const isInCart = cartItems.some(item => item.product.id === product.id);
      setAddedToCart(isInCart);
    }
  }, [cartItems, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error || !product) {
    return <ErrorDisplay message={error || 'Product not found'} onRetry={() => router.back()} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#333" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/cart')}>
              <ShoppingCart size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={[styles.image, { width: width - 32 }]}
            resizeMode="contain" 
          />
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.title}>{product.title}</Text>
          
          <View style={styles.ratingContainer}>
            <Rating 
              rate={product.rating.rate} 
              count={product.rating.count}
              size={20}
            />
          </View>
          
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title={addedToCart ? "Added to Cart" : "Add to Cart"} 
          onPress={handleAddToCart}
          fullWidth
          icon={addedToCart ? <Check size={20} color="white" /> : undefined}
          disabled={addedToCart}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  image: {
    height: 300,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});