import { SelfInfoType, SelfInfoUpdateInputType } from "@/features/self-info";
import request from "../config/axios";
import { clearObjRequest } from "../hooks";

export const getMe = async () => {
  try {
    const response = await request.get<SelfInfoType>("auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSelfInfo = async (data: SelfInfoUpdateInputType) => {
  try {
    const selfInfoData = clearObjRequest(data);
    const response = await request.put<SelfInfoType>(
      "/me/update",
      selfInfoData
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
