import moongose from "mongoose";

const productSchema = new moongose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    images1:{type:Array, required:true},
    images2:{type:Array, required:true},
    images3:{type:Array, required:true},
    images4:{type:Array, required:true},
    category:{type:String, required:true},
    subcategory:{type:String, required:true},
    date:{type:Date, default:Date.now},
    bestseller:{type:Boolean, default:false},
    size:{type:Array, required:true},
    brand:{type:String, required:true},
         
},{timestamps:true});

const Product = moongose.model("product", productSchema);
export default Product;