import { dbConnect } from "@/DataBase/connectMongo";
import ProductModel from "@/models/productModel";

export async function GET(request, { params: { productID } }) {
  await dbConnect();

  try {
    const res = await ProductModel.findOne({ _id: productID });
    return  Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return  Response.json({ error: er.message });
  }
}
