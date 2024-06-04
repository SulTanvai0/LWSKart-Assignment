"use server";

import { wishListsModel } from "@/models/wishListModel";

const { cartLists } = require("@/models/cartListModel");
const { dbConnect } = require("../connectMongo");

export async function GetCartDataByPRoductID(productId) {
  await dbConnect();

  try {
    const searchingForProduct = await cartLists.findOne({ productId }).lean();
    // Convert ObjectId to string if present
    if (searchingForProduct && searchingForProduct._id) {
      searchingForProduct._id = searchingForProduct._id.toString();
    }
    if (searchingForProduct && searchingForProduct.userId) {
      searchingForProduct.userId = searchingForProduct.userId.toString();
    }

    return searchingForProduct;
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
export async function GetWishListDataByPRoductID(productId) {
  await dbConnect();

  try {
    const searchingForProduct = await wishListsModel
      .findOne({ productId })
      .lean();
    // Convert ObjectId to string if present
    if (searchingForProduct && searchingForProduct._id) {
      searchingForProduct._id = searchingForProduct._id.toString();
    }
    if (searchingForProduct && searchingForProduct.userId) {
      searchingForProduct.userId = searchingForProduct.userId.toString();
    }

    return searchingForProduct;
  } catch (er) {
    console.log(er.message);
    return Response.json({ error: er.message });
  }
}
