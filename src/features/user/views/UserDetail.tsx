"use client";

import { DetailItem } from "@/features/article/components";
import { Header } from "@/libs/components/Form/Layout/Header";
import { Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteUser, useUserDetailQuery } from "../hooks";
import { Modal } from "@/libs/components/Modal";
import { toast } from "react-toastify";
const UserDetail = () => {
  const { userId } = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const { deleteUser } = useDeleteUser();
  const handleDeleteUser = () => {
    deleteUser(userId as string, {
      onSuccess: () => {
        router.push("/users");
        toast.success("Xoá người dùng thành công");
      },
      onError: () => {
        toast.error("Xoá người dùng thất bại");
      },
    });
  };

  const { data, isLoading } = useUserDetailQuery(userId as string);

  return (
    <Stack spacing={10}>
      <Stack spacing={4}>
        <Header
          title="Chi tiết"
          editPath="edit"
          deleteFunction={handleOpenModal}
        />

        <Stack spacing={2}>
          <Stack spacing="1px">
            <Stack direction="row" gap={4}>
              <DetailItem label="ID" value={"1"} isPending={isLoading} />
              <DetailItem
                label="Quyền"
                value={data?.data.role}
                isPending={isLoading}
              />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem
                label="Họ"
                value={data?.data.first_name}
                isPending={isLoading}
              />
              <DetailItem
                label="Ngày tạo"
                value={data?.data.created_at}
                isPending={isLoading}
              />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem
                label="Tên"
                value={data?.data.last_name}
                isPending={isLoading}
              />
            </Stack>

            <Stack direction="row" gap={4}>
              <DetailItem
                label="Email"
                value={data?.data.email}
                isPending={isLoading}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteUser}
        textSubmit="Xác nhận"
        description={`Bạn có chắc muốn xoá chứ?`}
        title="Xoá"
      />
    </Stack>
  );
};

export { UserDetail };
