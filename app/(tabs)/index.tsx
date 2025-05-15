import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorDisplay } from '@/components/ErrorDisplay';

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    
    setError(null);
    
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleRefresh = () => {
    loadProducts(true);
  };

  if (loading && !refreshing) {
    return <LoadingIndicator />;
  }

  if (error && !refreshing) {
    return <ErrorDisplay message={error} onRetry={loadProducts} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <Text style={styles.title}>All Products</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
});