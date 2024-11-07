//cart.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const Cart = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        const product = route.params?.product;
        if (product) {
            setCartItems(prevItems => {
                const itemExists = prevItems.find(item => item.id === product.id);
                if (itemExists) {
                    return prevItems.map(item =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...prevItems, { ...product, quantity: 1, selected: false }];
            });
        }
    }, [route.params]);

    const increaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const toggleSelect = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            return item.selected ? total + item.price * item.quantity : total;
        }, 0);
    };

const handlePayment = () => {
    const totalAmount = getTotal(); // Tính tổng số tiền từ giỏ hàng
    const selectedItems = cartItems.filter(item => item.selected); // Lọc sản phẩm đã chọn
    navigation.navigate('thanhtoan', { totalAmount, selectedItems, resetCart: () => setCartItems([]) });
};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng của bạn</Text>
            {cartItems.length === 0 ? (
                <Text>Giỏ hàng trống.</Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => toggleSelect(item.id)}>
                                    <Text style={[styles.checkbox, item.selected && styles.checked]}>
                                        {item.selected ? '☑️' : '⬜'}
                                    </Text>
                                </TouchableOpacity>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text>{item.price.toLocaleString()} VNĐ</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                                    <Text style={styles.removeButtonText}>Xoá</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <Text style={styles.total}>Tổng số tiền: {getTotal().toLocaleString()} VNĐ</Text>
                    <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
                        <Text style={styles.paymentButtonText}>Thanh toán</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    checkbox: {
        fontSize: 20,
        marginRight: 10,
    },
    checked: {
        color: 'green',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantity: {
        fontSize: 16,
    },
    removeButton: {
        marginLeft: 10,
    },
    removeButtonText: {
        color: 'red',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    paymentButton: {
        backgroundColor: '#ff9966',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Cart;
