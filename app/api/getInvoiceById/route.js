import { dbConnect } from "@/DataBase/connectMongo";
import { invoiceModel } from "@/models/invoiceModel";

export async function GET(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("invoiceId");

  try {
    const res = await invoiceModel.findOne({ _id });
    return Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
