import { dbConnect } from "@/DataBase/connectMongo";
import { paymentMethodsModel } from "@/models/paymentMethodModel";

export async function GET(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const paramId = searchParams.get("Id");

  try {
    const res = await paymentMethodsModel.find({ userId: paramId });

    return new Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return new Response.json({ error: er.message });
  }
}

export async function POST(request) {
  await dbConnect();
  const requestBody = await request.json();

  try {
    const res = await paymentMethodsModel.create(requestBody);
    return new Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return new Response.json({ error: er.message });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("Id");

  try {
    const res = await paymentMethodsModel.deleteOne({ _id });
    return new Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return new Response.json({ error: er.message });
  }
}
