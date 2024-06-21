"use server";

import { revalidatePath, revalidateTag } from "next/cache";

const localApi = `${process.env.LWSKART_URl}/api`;

export async function getUserByEmail(email) {
  try {
    const userReq = await fetch(`${localApi}/getUserByEmail?email=${email}`, {
      next: { tags: ["user"] },
    });
    const res = await userReq.json();
    return res?.data;
  } catch (err) {
    console.log("err in getWishListData : ", err.message);
  }
}

export async function addToWishListData(userId, productId) {
  try {
    const wishListReq = await fetch(`${localApi}/wishListControl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
    const result = await wishListReq.json();
    revalidateTag("user");
    revalidateTag("wishList");
    return result?.data;
  } catch (err) {
    console.log("err in addToWishListData : ", err.message);
  }
}
export async function getWishListData(userID) {
  try {
    const wishListReq = await fetch(
      `${localApi}/wishListControl?Id=${userID}`,
      { next: { tags: ["wishList"] } }
    );
    const result = await wishListReq.json();
    return result?.data;
  } catch (err) {
    console.log("err in getWishListData : ", err.message);
  }
}

export async function getCartListData(userID) {
  try {
    const wishListReq = await fetch(
      `${localApi}/cartListControl?Id=${userID}`,
      { next: { tags: ["cartList"] } }
    );
    const result = await wishListReq.json();
    return result?.data;
  } catch (err) {
    console.log("err in getCartListData : ", err.message);
  }
}

//ToDO: products

export async function getProductByID(productID) {
  try {
    const request = await fetch(`${localApi}/getProductById/${productID}`, {
      next: { tags: ["product"] },
    });
    const result = await request.json();

    return result?.data;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

export async function getProductsByCategory(category) {
  try {
    const request = await fetch(
      `${localApi}/getDataBySearchParams?category=${category}`,
      {
        next: { tags: ["product"] },
      }
    );
    const result = await request.json();

    return result?.data;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

export async function updateProductQuantity(productObj) {
  try {
    const response = await fetch(`${localApi}/updateProductQuntity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productObj),
    });
  } catch (err) {
    console.log("err in updateProductQuantity : ", err.message);
  }
}

export async function deleteFromCart(cartListId) {
  try {
    const deleteFromWishList = await fetch(
      `${localApi}/cartListControl?Id=${cartListId}`,
      {
        method: "DELETE",
      }
    );
    revalidateTag("cart");

    const response = await deleteFromWishList.json();
    return response;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}
export async function deleteFromWishList(wishListId) {
  try {
    const deleteFromWishList = await fetch(
      `${localApi}/wishListControl?Id=${wishListId}`,
      {
        method: "DELETE",
      }
    );
    const response = await deleteFromWishList.json();

    revalidateTag("wishList");
    return response;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

//ToDo: payment method

export async function getPaymentMethods(userId) {
  try {
    const request = await fetch(
      `${localApi}/controlpaymentMethods?Id=${userId}`,
      { next: { tags: ["paymentMethod"] } }
    );
    const response = await request.json();
    return response?.data;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}
export async function deletePaymentMethod(Id) {
  try {
    const deleteCard = await fetch(
      `${localApi}/controlpaymentMethods?Id=${Id}`,
      {
        method: "DELETE",
      }
    );
    const response = await deleteCard.json();

    revalidatePath("/profile");
    revalidateTag("paymentMethod");
    return response;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

// toDo: profile address

export async function getUserAddress(userId) {
  try {
    const request = await fetch(`${localApi}/userAdress?Id=${userId}`, {
      next: { tags: ["address"] },
    });
    const response = await request.json();
    return response?.data;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

export async function getAdreesById(adressId) {
  try {
    const request = await fetch(`${localApi}/updateUserAdress?Id=${adressId}`, {
      next: { tags: ["address"] },
    });
    const response = await request.json();
    return response?.data;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}
export async function createAddress(address) {
  try {
    const response = await fetch(`${localApi}/userAdress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const res = await response.json();
    return res;
    revalidateTag("address");
  } catch (error) {
    console.error("Error createAddress:", error);
  }
}

export async function updateAddress(address) {
  try {
    const response = await fetch(`${localApi}/updateUserAdress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const res = await response.json();
    return res;
    revalidateTag("user");
    // revalidateTag("cart");
  } catch (error) {
    console.error("Error updateAddress:", error);
  }
}

export async function deleteUserAddress(Id) {
  try {
    const deleteCard = await fetch(`${localApi}/userAdress?Id=${Id}`, {
      method: "DELETE",
    });
    const response = await deleteCard.json();

    revalidatePath("/profile");
    revalidateTag("address");
    return response;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

//toDO: control oder

export async function getAdressByUserId(userId) {
  try {
    const request = await fetch(`${localApi}/controlOders?Id=${userId}`, {
      next: { tags: ["address"] },
    });
    const response = await request.json();
    return response?.data;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

export async function postOder(oderObj) {
  try {
    const response = await fetch(`${localApi}/controlOders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oderObj),
    });
    const res = await response.json();
    return res;
    revalidateTag("address");
  } catch (error) {
    console.error("Error createAddress:", error);
  }
}

// todo : invoice
export async function getInvoiceById(invoiceId) {
  try {
    const request = await fetch(
      `${localApi}/getInvoiceById?invoiceId=${invoiceId}`
    );
    const response = await request.json();
    return response?.data;
  } catch (err) {
    console.log("err in getProductByID : ", err.message);
  }
}

export async function postInvoice(invoiceObj) {
  try {
    const response = await fetch(`${localApi}/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceObj),
    });
    const res = await response.json();
    return res;
    revalidateTag("address");
  } catch (error) {
    console.error("Error createAddress:", error);
  }
}
export async function getArrivalData() {
  try {
    const request = await fetch(
      `${localApi}/getProductsByFiledName&FiledValue?filedname=NewProduct&filedvalue=true`
    );
    const result = await request.json();

    return result?.data || [];

  } catch (err) {
    console.log("err in getArrivalData : ", err.message);
    return  [];
  }
}