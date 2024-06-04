import { dbConnect } from "@/DataBase/connectMongo";
import { userModel } from "@/models/userModel";

export async function GET(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    const res = await userModel.findOne({ email });
    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
