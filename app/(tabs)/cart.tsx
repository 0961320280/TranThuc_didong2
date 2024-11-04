import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const CartScreen = ({ route, navigation }) => {
  const { cartItems, onCartUpdate } = route.params;
  const [items, setItems] = useState(cartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));

  useEffect(() => {
    if (onCartUpdate) {
      onCartUpdate(items);
    }
  }, [items]);

  const increaseQuantity = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = items.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setItems(updatedItems);
  };

  const removeFromCart = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCashPayment = () => {
    Alert.alert("Thanh toán tiền mặt", "Bạn đã chọn thanh toán tiền mặt.");
  };

  const handleOnlinePayment = () => {
    // Bạn có thể tích hợp với một dịch vụ thanh toán online ở đây
    Alert.alert("Thanh toán online", "Bạn đã chọn thanh toán online.");
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>Giá: {item.price} đ</Text>
        <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.controlButton}>
            <Text style={styles.controlButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.controlButton}>
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const totalPrice = calculateTotalPrice();

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={items}
        />
      ) : (
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
      )}
      {items.length > 0 && (
        <Text style={styles.totalPrice}>Tổng tiền: {totalPrice} đ</Text>
      )}
      <View style={styles.paymentButtonsContainer}>
        <TouchableOpacity
          style={styles.cashButton}
          onPress={handleCashPayment}
        >
          <Text style={styles.buttonText}>Thanh toán tiền mặt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.onlineButton}
          onPress={handleOnlinePayment}
        >
          <Text style={styles.buttonText}>Thanh toán online</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginVertical: 5,
  },
  productQuantity: {
    fontSize: 16,
    color: '#888',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#ff6347',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  paymentButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cashButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  onlineButton: {
    backgroundColor: '#4682b4',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export { CartScreen };
