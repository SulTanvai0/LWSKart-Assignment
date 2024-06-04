import { dbConnect } from "@/DataBase/connectMongo";
import { contactUsModel } from "@/models/contactusModel";

export async function POST(request) {
  await dbConnect();
  const requestBody = await request.json();

  try {
    const res = await contactUsModel.create(requestBody);
    return new Response.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return new Response.json({ error: er.message });
  }
}
