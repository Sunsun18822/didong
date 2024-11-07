// detail.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Detail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const productId = route.params?.productId;
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        setLoading(true); 
        fetch('http://localhost:3000/data')
            .then(res => res.json())
            .then(data => {
                const foundProduct = data.find(item => item.id === productId);
                setProduct(foundProduct);

                // Lấy sản phẩm liên quan dựa trên danh mục
                if (foundProduct) {
                    const related = data.filter(item => item.categoryId === foundProduct.categoryId && item.id !== productId);
                    setRelatedProducts(related);
                }
            })
            .catch(error => console.error('Lỗi khi lấy sản phẩm:', error))
            .finally(() => setLoading(false)); 
    }, [productId]);

    const handleAddToCart = () => {
        navigation.navigate('giohang', { product });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#ff6600" />;
    }

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Sản phẩm không tồn tại.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm..."
                    // Implement search functionality if needed
                />
                <TouchableOpacity onPress={() => navigation.navigate('giohang')}>
                    <Ionicons name="cart" size={24} color="#ff6600" />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>{product.price} VND</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buyButton]}
                    onPress={() => alert('Mua ngay!')}
                >
                    <Text style={styles.buttonText}>Mua ngay</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Trở về</Text>
            </TouchableOpacity>

            <Text style={styles.relatedTitle}>Có thể bạn cũng thích</Text>
            {relatedProducts.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedProducts}>
                    {relatedProducts.map(related => (
                        <TouchableOpacity key={related.id} style={styles.relatedCard} onPress={() => navigation.navigate('chitiet', { productId: related.id })}>
                            <Image source={{ uri: related.image }} style={styles.relatedImage} resizeMode="cover" />
                            <Text style={styles.relatedName}>{related.name}</Text>
                            <Text style={styles.relatedPrice}>{related.price} VND</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <Text>Không có sản phẩm liên quan.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    price: {
        fontSize: 18,
        color: '#ff6600',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        backgroundColor: '#ff6600',
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 10,
    },
    buyButton: {
        marginRight: 0,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    backButton: {
        padding: 15,
        backgroundColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
    },
    relatedTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    relatedProducts: {
        marginVertical: 10,
    },
    relatedCard: {
        marginRight: 15,
        width: 120,
        alignItems: 'center',
    },
    relatedImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    relatedName: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 5,
    },
    relatedPrice: {
        fontSize: 12,
        color: '#ff6600',
    },
});

export default Detail;
