import { dbConnect } from "@/DataBase/connectMongo";
import ProductModel from "@/models/productModel";

export async function GET(request, { params }) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const min = parseFloat(searchParams.get("min"));
  const max = parseFloat(searchParams.get("max"));
  const size = searchParams.get("size");
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  // Initialize an empty match object
  const match = {};

  // Conditionally add match criteria
  if (category) {
    match.category = { $regex: category, $options: "i" }; // Case-insensitive regex match
  }
  if (min && max) {
    match.price = { $gte: parseFloat(min), $lte: parseFloat(max) };
  }
  if (size) {
    match.size = { $elemMatch: { [size]: { $exists: true } } };
  }
  if (query) {
    match.$or = [
      { name: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { brand: { $regex: query, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  try {
    const res = await ProductModel.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalDocs = await ProductModel.countDocuments(match);
    const totalPages = Math.ceil(totalDocs / limit);

    return Response.json({
      status: 200,
      currentPage: page,
      totalDocs,
      totalPages,
      data: res,
    });
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
