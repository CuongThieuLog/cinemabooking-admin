import { LoginInputType, LoginOutputType } from "@/features/auth";
import request from "../config/axios";

export const login = async ({ email, password }: LoginInputType) => {
  try {
    const res = await request.post<LoginOutputType>("/login", {
      email,
      password,
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    await request.post("/logout");
  } catch (error) {
    console.log(error);
  }
};
