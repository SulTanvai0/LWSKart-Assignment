import { dbConnect } from "@/DataBase/connectMongo";
import ProductModel from "@/models/productModel";

export async function POST(request) {
  await dbConnect();
  const postBody = await request.json();

  try {
    const res = await ProductModel.create(postBody);

    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);

    return Response.json({ error: er.message });
  }
}
