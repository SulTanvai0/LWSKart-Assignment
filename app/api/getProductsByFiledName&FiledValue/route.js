import { dbConnect } from "@/DataBase/connectMongo";
import ProductModel from "@/models/productModel";

export async function GET(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const filedName = searchParams.get("filedname");
  const filedValue = searchParams.get("filedvalue");

  const searchQuery = { [filedName]: filedValue };

  try {
    const res = await ProductModel.find(searchQuery);
    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
