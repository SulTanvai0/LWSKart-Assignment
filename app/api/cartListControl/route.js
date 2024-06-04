import { dbConnect } from "@/DataBase/connectMongo";
import { cartLists } from "@/models/cartListModel";

export async function GET(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const paramId = searchParams.get("Id");

  try {
    const res = await cartLists.find({ userId: paramId });
    return  Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return  Response.json({ error: er.message });
  }
}

export async function POST(request) {
  await dbConnect();
  const requestBody = await request.json();

  try {
    const res = await cartLists.findOneAndUpdate(
      { userId: requestBody.userId, productId: requestBody.productId },
      requestBody,
      { new: true, upsert: true }
    );

    return  Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return  Response.json({ error: er.message });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("Id");

  try {
    const res = await cartLists.deleteOne({ _id });
    return  Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return  Response.json({ error: er.message });
  }
}
