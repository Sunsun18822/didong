import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Thêm thư viện biểu tượng Ionicons
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để kiểm soát việc hiển thị mật khẩu

  const handlePhoneInput = (text) => {
    // Chỉ cho phép nhập số
    const numericText = text.replace(/[^0-9]/g, '');
    setPhone(numericText);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Chuyển đổi trạng thái hiển thị mật khẩu
  };

  const handleRegister = () => {
    if (username === '' || password === '' || phone === '') {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Gửi yêu cầu đăng ký tới API
    fetch('https://6687f1ce0bc7155dc019d520.mockapi.io/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        phone: phone,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.id) {
          // Nếu đăng ký thành công
          alert('Đăng ký thành công');
          navigation.navigate('index'); // Điều hướng về trang index sau khi đăng ký thành công
        } else {
          alert('Đã xảy ra lỗi trong quá trình đăng ký.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký Tài Khoản</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Điện Thoại"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={handlePhoneInput}
        keyboardType="numeric"
        maxLength={10} // Giới hạn độ dài của số điện thoại
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible} // Hiển thị mật khẩu dựa trên trạng thái
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f7',
  },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff6666',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  passwordContainer: {
    position: 'relative', // Để cho biểu tượng con mắt nằm trong ô nhập
    marginBottom: 20,
  },
  passwordInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 50, // Tạo không gian cho biểu tượng con mắt
    borderWidth: 1,
    borderColor: '#ff6666',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13, // Đặt vị trí biểu tượng con mắt
  },
  button: {
    backgroundColor: '#ff9966',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;