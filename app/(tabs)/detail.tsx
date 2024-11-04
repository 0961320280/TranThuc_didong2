import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params; // Nhận thông tin sản phẩm từ route.params

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer} // Thêm contentContainerStyle
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => console.log('Mua ngay:', product.title)}
        >
          <Text style={styles.buttonText}>Mua ngay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => console.log('Thêm vào giỏ hàng:', product.title)}
        >
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center', // Áp dụng alignItems ở đây
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buyNowButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#4682b4',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export { ProductDetailScreen };
