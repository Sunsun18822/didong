import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Nhập thư viện biểu tượng Ionicons
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để kiểm soát việc hiển thị mật khẩu

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Chuyển đổi trạng thái hiển thị mật khẩu
  };

  const handleLogin = () => {
    // Lấy danh sách người dùng từ API
    fetch('https://6687f1ce0bc7155dc019d520.mockapi.io/user', {
      method: 'GET', // Sử dụng GET để lấy dữ liệu
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // Kiểm tra xem username và password có trùng khớp với dữ liệu API không
        const user = json.find((user) => user.username === username && user.password === password);
        if (user) {
          // Nếu đăng nhập thành công
          navigation.navigate('trangchu');
        } else {
          // Nếu đăng nhập không thành công
          alert('Sai tên người dùng hoặc mật khẩu. Vui lòng thử lại.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/th.jpg')} // Đường dẫn đến hình ảnh logo
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
              <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.noAccountText}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity>
          <Text style={styles.registerText} onPress={() => navigation.navigate('dangky')}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
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
  forgotPassword: {
    color: '#3b82f6',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  noAccountText: {
    fontSize: 14,
    color: '#333',
  },
  registerText: {
    fontSize: 14,
    color: '#3b82f6',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default LoginScreen;