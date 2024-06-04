import { dbConnect } from "@/DataBase/connectMongo";
import ProductModel from "@/models/productModel";

export async function POST(request) {
  await dbConnect();

  let postBody;
  try {
    postBody = await request.json();
  } catch (error) {
    return  Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  const { productId, quantity } = postBody;

  if (!productId || typeof quantity !== "number") {
    return  Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
    });
  }

  try {
    const findProduct = await ProductModel.findOne({ _id: productId });
    if (!findProduct) {
      return  Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    const newStock = findProduct.inStock - Number(quantity);
    if (newStock < 0) {
      return  Response(JSON.stringify({ error: "Insufficient stock" }), {
        status: 400,
      });
    }

    const res = await ProductModel.updateOne(
      { _id: productId },
      { inStock: newStock }
    );

    return  Response(JSON.stringify({ status: 200, data: res }), {
      status: 200,
    });
  } catch (error) {
    console.error(error.message);
    return  Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
