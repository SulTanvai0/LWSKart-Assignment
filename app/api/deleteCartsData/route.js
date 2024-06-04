import { dbConnect } from "@/DataBase/connectMongo";
import { ordersModel } from "@/models/odersModel";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();
  const requestBody = await request.json();

  // Extract _id values from the request body objects and ensure they are valid ObjectId
  const idsToDelete = requestBody.map((order) => order._id);
  const validObjectIds = idsToDelete.filter((id) => Types.ObjectId.isValid(id));

  if (validObjectIds.length === 0) {
    return NextResponse.json({ status: 400, error: "Invalid IDs provided" });
  }

  try {
    const res = await ordersModel.deleteMany({ _id: { $in: validObjectIds } });

    if (res.deletedCount === 0) {
      console.log("No documents matched the provided IDs.");
    }

    return NextResponse.json({ status: 200, data: res });
  } catch (er) {
    console.log(er.message);
    return NextResponse.json({ error: er.message });
  }
}
