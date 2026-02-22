const Products = () => {
  return (
    <div className="w-[100vw] min-h-[100vh] flex flex-col items-center pt-y-10 justify-start bg-white">
      <div className="w-[90vw] flex flex-col items-center justify-center gap-[10px] min-h-[70px]">
        <LatestCollections />
      </div>
      <div className="w-[90vw] flex flex-col items-center justify-center gap-[10px] min-h-[70px]" >
        <BestSellers />
      </div>
    </div>
  );  
};
export default Products;
