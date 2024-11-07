// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
// import { useRoute } from '@react-navigation/native';

// const ThanhToan = ({ navigation }) => {
//     const route = useRoute();
//     const { totalAmount, resetCart } = route.params || { totalAmount: 0, resetCart: () => {} };
//     const [paymentMethod, setPaymentMethod] = useState(null);
//     const [otp, setOtp] = useState('');
//     const [isOtpVisible, setIsOtpVisible] = useState(false);
//     const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

//     const handleConfirmPayment = () => {
//         if (otp === '123456') {
//             setIsPaymentSuccess(true);
//             resetCart();
//         } else {
//             alert('Mã OTP không hợp lệ');
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             {isPaymentSuccess ? (
//                 <>
//                     <Text style={styles.title}>Thanh toán thành công!</Text>
//                     <Text style={styles.note}>Cảm ơn bạn đã đặt hàng!</Text>
//                 </>
//             ) : (
//                 <>
//                     <Text style={styles.title}>Chọn phương thức thanh toán</Text>
//                     <View style={styles.paymentOptions}>
//                         <TouchableOpacity
//                             style={[styles.paymentOption, paymentMethod === 'Momo' && styles.selectedOption]}
//                             onPress={() => setPaymentMethod('Momo')}
//                         >
//                             <Text style={styles.paymentText}>Momo</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[styles.paymentOption, paymentMethod === 'Ngân hàng' && styles.selectedOption]}
//                             onPress={() => setPaymentMethod('Ngân hàng')}
//                         >
//                             <Text style={styles.paymentText}>Ngân hàng</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {paymentMethod && (
//                         <View style={styles.details}>
//                             <Text style={styles.detailTitle}>Chi tiết giao dịch:</Text>
//                             <Text>Tổng số tiền: <Text style={styles.amount}>{totalAmount.toLocaleString()} VNĐ</Text></Text>
//                             <Text>Phí giao dịch: <Text style={styles.amount}>0 VNĐ</Text></Text>
//                             <Button title="Xác nhận" onPress={() => setIsOtpVisible(true)} />
//                         </View>
//                     )}

//                     {isOtpVisible && (
//                         <View style={styles.otpContainer}>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Nhập mã OTP"
//                                 value={otp}
//                                 onChangeText={setOtp}
//                                 keyboardType="numeric"
//                             />
//                             <Button title="Xác thực" onPress={handleConfirmPayment} />
//                         </View>
//                     )}
//                 </>
//             )}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f8f8f8',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#333',
//     },
//     note: {
//         fontSize: 18,
//         fontStyle: 'italic',
//         color: '#666',
//         marginTop: 10,
//     },
//     paymentOptions: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginBottom: 20,
//     },
//     paymentOption: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 15,
//         marginHorizontal: 5,
//         borderRadius: 8,
//         alignItems: 'center',
//         elevation: 2,
//     },
//     selectedOption: {
//         borderColor: '#007bff',
//         borderWidth: 2,
//     },
//     paymentText: {
//         fontSize: 18,
//         color: '#333',
//     },
//     details: {
//         marginTop: 20,
//         padding: 15,
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         width: '100%',
//         elevation: 2,
//     },
//     detailTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     amount: {
//         fontWeight: 'bold',
//         color: '#007bff',
//     },
//     otpContainer: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         width: '80%',
//         marginBottom: 10,
//         paddingLeft: 10,
//         borderRadius: 5,
//         backgroundColor: '#fff',
//     },
// });

// export default ThanhToan;
// // 