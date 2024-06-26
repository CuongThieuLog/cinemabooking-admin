import {
  UserCreateInputType,
  UserListQueryInputType,
  UserListType,
  UserUpdateInputType,
} from "@/features/user";
import {
  QueryInputUserDetailType,
  UserDetailResponseType,
} from "@/features/user/type";
import request from "../config/axios";

export const getListUser = async (params: UserListQueryInputType) => {
  try {
    const response = await request.get<UserListType>("/users/list", { params });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: UserCreateInputType) => {
  try {
    const response = await request.post("/users/registration", {
      ...data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await request.get<UserDetailResponseType>(
      `/users/detail/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data: UserUpdateInputType) => {
  try {
    const { id, ...dataRequest } = data;

    const response = await request.patch(`/users/update/${id}`, dataRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetail = async ({
  column,
  sort_by,
  userId,
}: QueryInputUserDetailType) => {
  try {
    const response = await request.get<UserDetailResponseType>(
      `/users/detail/${userId}`,
      {
        params: {
          sort_by,
          column,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await request.delete(`/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
