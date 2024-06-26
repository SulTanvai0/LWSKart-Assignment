import { dbConnect } from "@/DataBase/connectMongo";
import ProductModel from "@/models/productModel";

export async function GET(request, { params: { category } }) {
  await dbConnect();

  try {
    const res = await ProductModel.find({ category });
    return  Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return  Response.json({ error: er.message });
  }
}
