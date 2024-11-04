import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, SafeAreaView, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { ProductDetailScreen } from './detail'; 
import { CartScreen } from './cart';

const CATEGORIES = ['page home', 'Men\'s Clothing', 'Women\'s Clothing', 'Electronics', 'Jewelery'];

const ProductListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);  
  const [filteredProducts, setFilteredProducts] = useState([]);  
  const [selectedCategory, setSelectedCategory] = useState('page home');
  const [cartItems, setCartItems] = useState([]); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); 
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : products;
    setFilteredProducts(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const filtered = category === 'Tất cả'
      ? products
      : products.filter(product => product.category === category.toLowerCase());
    setFilteredProducts(filtered);
  };

  const handleProductPress = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.productWrapper}>
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productText}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.detailButton}>
            <Icon name="info" size={30} color="#ff6347" /> {/* Biểu tượng xem chi tiết */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
            <Icon name="add-shopping-cart" size={30} color="#fff" /> {/* Biểu tượng giỏ hàng */}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategorySelect(item)}>
      <View style={[styles.categoryItem, selectedCategory === item && styles.selectedCategory]}>
        <Text style={styles.categoryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Product Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
          <Icon name="search" size={30} color="#000" />
        </TouchableOpacity>

        {/* Cart Icon with Badge */}
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cartItems })}>
          <Icon name="shopping-cart" size={30} color="#000" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../images/banner3.jpg')}
          style={styles.bannerImage}
          resizeMode="cover" // Căn chỉnh hình ảnh theo chiều rộng và chiều cao đã định
        />
      </View>     

      {/* Danh mục sản phẩm */}
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2} 
        columnWrapperStyle={styles.row}
        style={styles.productList}
      />
    </SafeAreaView>
  );
};

// Stack Navigator cho điều hướng
const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Danh sách sản phẩm' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Chi tiết sản phẩm' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Giỏ hàng' }}
      />
    </Stack.Navigator>
  );
};

// Các style cho ứng dụng
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  cartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: '#ff6347',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productList: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productWrapper: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  productItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 230,
  },
  productText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Căn giữa các biểu tượng
    marginTop: 10,
    width: '100%',
  },
  detailButton: {
    marginRight: 15, // Khoảng cách giữa hai biểu tượng
  },
  addToCartButton: {
    backgroundColor: '#ff6347',
    padding: -15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryList: {
    marginBottom: -170,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#ff6347',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
