import { dbConnect } from "@/DataBase/connectMongo";
import { userModel } from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();

  const { fullName, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = { fullName, email, password: hashedPassword };

  try {
    const user = await userModel.create(newUser);
    if (user) {
      return Response.json({
        status: "success",
        message: "User has been created",
      });
    }
  } catch (er) {
    return Response.json({ status: "fail", error: er.message });
  }
}
