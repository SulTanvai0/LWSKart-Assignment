import { dbConnect } from "@/DataBase/connectMongo";
import { addressModel } from "@/models/adressModel";

export async function POST(request) {
  await dbConnect();
  const requestBody = await request.json();

  try {
    const res = await addressModel.updateOne(
      { _id: requestBody._id },
      requestBody
    );
    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const paramId = searchParams.get("Id");

  try {
    const res = await addressModel.findOne({ _id: paramId });
    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
