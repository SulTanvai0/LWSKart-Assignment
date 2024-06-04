import { dbConnect } from "@/DataBase/connectMongo";
import { addressModel } from "@/models/adressModel";

export async function GET(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const paramId = searchParams.get("Id");

  try {
    const res = await addressModel.find({ userId: paramId });
    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}

export async function POST(request) {
  await dbConnect();
  const requestBody = await request.json();
  console.log(requestBody);
  try {
    const res = await addressModel.create(requestBody);

    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("Id");

  try {
    const res = await addressModel.deleteOne({ _id });
    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
