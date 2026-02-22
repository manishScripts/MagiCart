import {useState, useContext ,useEffect }from 'react';
import Title from './Title';
import Card from './Card';
import { ShoppingContext } from '../context/shoppingContext';
const LatestCollection = () => {
  let {products} = useContext(ShoppingContext);
  let [LatestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0,8));
  },[products ])
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8">
       <div className="text-center max-w-3xl mx-auto space-y-3">
        <Title text1={"Latest"} text2={"Collection"}/>
        <p className="text-gray-700 text-base sm:text-lg font-light tracking-wide mt-4 mb-6">
          Step Into Style - The New Collection during the season
        </p>
       </div>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {LatestProducts.map((product, index) => (
          <Card 
            key={index}
            id ={product._id}
            image={product.images1}
            title={product.name}
            price={product.price}
          />
        ))}
       </div>
       
        </div>
  );
}

export default LatestCollection;
