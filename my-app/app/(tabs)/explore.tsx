// //home.tsx
// import React, { useEffect, useState } from 'react';
// import { categories } from './data'; // Giả sử bạn đã import categories
// import { TouchableOpacity, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Home = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     const [products, setProducts] = useState([]);
//     const navigation = useNavigation();

//     useEffect(() => {
//         fetch('https://fakestoreapi.com/products')
//             .then(res => res.json())
//             .then(json => setProducts(json))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []); // Chỉ chạy một lần khi component mount

//     const updateProduct = () => {
//         fetch("https://fakestoreapi.com/products/1", { // Thay 1 bằng ID sản phẩm bạn muốn cập nhật
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 title: "test product",
//                 price: 13.5,
//                 description: "lorem ipsum set",
//                 image: "https://tse1.mm.bing.net/th?id=OIP.FZ_1HKDkLEMoJgWHzi7t9QHaLH&pid=Api&P=0&h=220",
//                 category: "electronic",
//             }),
//         })
//         .then((res) => res.json())
//         .then((json) => {
//             console.log('Updated Product:', json);
//             // Cập nhật lại danh sách sản phẩm
//             setProducts(prevProducts => 
//                 prevProducts.map(product => 
//                     product.id === 1 ? { ...product, ...json } : product // Thay 1 bằng ID bạn đã cập nhật
//                 )
//             );
//         })
//         .catch((error) => console.error('Error updating product:', error));
//     };

//     const filteredProducts = products.filter(product => {
//         const isInCategory = selectedCategory ? product.category === selectedCategory : true; // Sửa categoryId thành category
//         const isInSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
//         return isInCategory && isInSearch;
//     });

//     return (
//         <div className="container">
//             <header>
//                 <h1>JOLLIBEE, XIN CHÀO</h1>
//                 <div className="search-bar">
//                     <input
//                         type="text"
//                         placeholder="Tìm kiếm sản phẩm..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <button onClick={() => setSearchTerm(searchTerm)}>Tìm kiếm</button>
//                 </div>
//             </header>
//             <section className="banner">
//                 <img src="https://jollibee.com.vn/media/mageplaza/bannerslider/banner/image/a/6/a6b53e6193c937976ed8_1.jpg" alt="Banner" />
//             </section>
//             <nav className="categories">
//                 <button onClick={() => setSelectedCategory(null)}>Tất cả</button>
//                 {categories.map(category => (
//                     <button
//                         key={category.id}
//                         onClick={() => setSelectedCategory(category.id)}
//                     >
//                         {category.name}
//                     </button>
//                 ))}
//             </nav>
//             <button onClick={updateProduct}>Cập nhật sản phẩm</button> {/* Nút để cập nhật sản phẩm */}
//             <section className="products">
//                 {filteredProducts.length === 0 ? (
//                     <p>Không tìm thấy sản phẩm nào.</p>
//                 ) : (
//                     <div className="product-grid">
//                         {filteredProducts.map(product => (
//                             <div key={product.id} className="product-card">
//                                 <img src={product.image} alt={product.title} />
//                                 <h3>{product.title}</h3>
//                                 <p>{product.price} VND</p>
//                                 <TouchableOpacity onPress={() => navigation.navigate('detail', { productId: product.id })}>
//                                     <Text>Xem Chi Tiết</Text>
//                                 </TouchableOpacity>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </section>            <style>{`
//                 body {
//                     font-family: Arial, sans-serif;
//                     margin: 0;
//                     padding: 0;
//                     background-color: #f8f8f8;
//                     overflow-y: scroll; /* Enable vertical scrolling */
//                 }
//                 .container {
//                     max-width: 1200px;
//                     margin: auto;
//                     padding: 20px;
//                     overflow-x: hidden; /* Prevent horizontal scrolling */
//                 }
//                 header {
//                     text-align: center;
//                     padding: 20px;
//                     background-color: #fff;
//                     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                 }
//                 .search-bar {
//                     margin-top: 20px;
//                 }
//                 input[type="text"] {
//                     padding: 10px;
//                     width: 250px;
//                     border: 1px solid #ccc;
//                     border-radius: 4px;
//                     outline: none;
//                 }
//                 input[type="text"]:focus {
//                     border-color: #007BFF;
//                 }
//                 button {
//                     padding: 10px 15px;
//                     margin-left: 10px;
//                     border: none;
//                     border-radius: 4px;
//                     background-color: #cccccc;
//                     color: #ff6600;
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                 }
//                 button:hover {
//                     background-color: #ff9966;
//                 }
//                 .banner img {
//                     width: 100%;
//                     height: auto;
//                     display: block;
//                 }
//                 .categories {
//                     display: flex;
//                     justify-content: center;
//                     margin: 20px 0;
//                 }
//                 .categories button {
//                     margin: 0 10px;
//                     padding: 10px 15px;
//                     border: none;
//                     border-radius: 4px;
//                     background-color: #eee;
//                     transition: background-color 0.3s;
//                 }
//                 .categories button:hover {
//                     background-color: #ff9966;
//                 }
//                 .products {
//                     padding: 20px 0;
//                 }
//                 .product-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//                     gap: 20px;
//                 }
//                 .product-card {
//                     border: 1px solid #ddd;
//                     border-radius: 8px;
//                     padding: 10px;
//                     background-color: #fff;
//                     text-align: center;
//                     transition: box-shadow 0.3s;
//                 }
//                 .product-card:hover {
//                     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//                 }
//                 .product-card img {
//                     width: 100%;
//                     height: auto;
//                     border-radius: 8px;
//                 }
//                 .product-card h3 {
//                     font-size: 1.2em;
//                     margin: 10px 0;
//                 }
//                 .product-card p {
//                     font-size: 1em;
//                     color: #333;
//                 }
//             `}
//         </style>

//         </div>
//     );
// };

// export default Home;
