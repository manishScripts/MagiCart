import {useState,useEffect,useContext} from 'react';
import Title from './Title';
import Card from './Card';
import { ShoppingContext } from '../context/shoppingContext';
const BestSellers = () => {
  let {products} = useContext(ShoppingContext);
  let [BestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
      setBestSellingProducts(products.filter(product => product.bestseller === true).slice(0,8));
    },[products ])
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8">
       <div className="text-center max-w-3xl mx-auto space-y-3">
        <Title text1={"Best"} text2={"Sellers"}/>
        <p className="text-gray-700 text-base sm:text-lg font-light tracking-wide mt-4 mb-6" >
          Tried,Tested,Loved - Discover Our All-Time Best Sellers
        </p>
       </div>
       {<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {BestSellingProducts.map((product, index) => (
          <Card 
            key={index}
            id ={product._id}
            image={product.images1}
            title={product.name}
            price={product.price}
          />
        ))}
       </div>}
       
        </div>
  );
}   
export default BestSellers;