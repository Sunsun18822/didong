import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ThanhToan = ({ navigation }) => {
    const route = useRoute();
    const { totalAmount, selectedItems, resetCart } = route.params || { totalAmount: 0, selectedItems: [], resetCart: () => {} };
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [otp, setOtp] = useState('');
    const [isOtpVisible, setIsOtpVisible] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        const newOrderId = `ORDER-${Math.floor(Math.random() * 1000000)}`;
        setOrderId(newOrderId);
    }, []);

    const handleConfirmPayment = async () => {
        if (paymentMethod === 'Tiền mặt' || otp === '123456') {
            const orderData = {
                orderId,
                totalAmount,
                items: selectedItems,
            };

            try {
                const response = await fetch('https://6687f1ce0bc7155dc019d520.mockapi.io/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    setIsPaymentSuccess(true);
                    resetCart();
                } else {
                    alert('Lưu đơn hàng thất bại!');
                }
            } catch (error) {
                alert('Có lỗi xảy ra: ' + error.message);
            }
        } else {
            alert('Mã OTP không hợp lệ');
        }
    };

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
        setIsConfirmed(true);
        if (method === 'Tiền mặt') {
            handleConfirmPayment(); // Automatically confirm payment for cash
        } else {
            setIsOtpVisible(true); // Show OTP input for bank transfer
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isPaymentSuccess ? (
                <>
                    <Text style={styles.title}>Thanh toán thành công!</Text>
                    <Text style={styles.note}>Mã đơn hàng của bạn: {orderId}</Text>
                    <Text style={styles.note}>Cảm ơn bạn đã đặt hàng!</Text>
                </>
            ) : (
                <>
                    <Text style={styles.title}>Chọn phương thức thanh toán</Text>
                    <View style={styles.paymentOptions}>
                        <TouchableOpacity
                            style={[styles.paymentOption, paymentMethod === 'Tiền mặt' && styles.selectedOption]}
                            onPress={() => handlePaymentMethodSelect('Tiền mặt')}
                        >
                            <Text style={styles.paymentText}>Tiền mặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.paymentOption, paymentMethod === 'Ngân hàng' && styles.selectedOption]}
                            onPress={() => handlePaymentMethodSelect('Ngân hàng')}
                        >
                            <Text style={styles.paymentText}>Ngân hàng</Text>
                        </TouchableOpacity>
                    </View>

                    {paymentMethod && !isConfirmed && (
                        <View style={styles.details}>
                            <Text style={styles.detailTitle}>Chi tiết giao dịch:</Text>
                            {selectedItems.map(item => (
                                <View key={item.id} style={styles.itemDetail}>
                                    <Text>{item.name} - Số lượng: {item.quantity} - Giá: {item.price.toLocaleString()} VNĐ</Text>
                                </View>
                            ))}
                            <Text>Tổng số tiền: <Text style={styles.amount}>{totalAmount.toLocaleString()} VNĐ</Text></Text>
                            <Text>Phí giao dịch: <Text style={styles.amount}>0 VNĐ</Text></Text>
                            <Button title="Xác nhận" onPress={() => { setIsConfirmed(true); paymentMethod === 'Ngân hàng' && setIsOtpVisible(true); }} />
                        </View>
                    )}

                    {isOtpVisible && (
                        <View style={styles.otpContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="numeric"
                            />
                            <Button title="Xác thực" onPress={handleConfirmPayment} />
                        </View>
                    )}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    note: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 10,
    },
    paymentOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    paymentOption: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
    },
    selectedOption: {
        borderColor: '#007bff',
        borderWidth: 2,
    },
    paymentText: {
        fontSize: 18,
        color: '#333',
    },
    details: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '100%',
        elevation: 2,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemDetail: {
        marginBottom: 5,
    },
    amount: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    otpContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});

export default ThanhToan;
