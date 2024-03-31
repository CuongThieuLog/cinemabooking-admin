"use client";

import { DetailItem } from "@/features/article/components";
import { Input, InputPassword, Select } from "@/libs/components/Form";
import { FormLayout } from "@/libs/components/Form/Layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUserCreate } from "../hooks/useUserCreate";
import { useUserDetail } from "../hooks/useUserDetail";
import { useUserUpdate } from "../hooks/useUserUpdate";
import { ROLE_OPTIONS } from "../options";
import { UserCreateInputSchema, UserCreateInputType } from "../type";

const UserForm = () => {
  const router = useRouter();
  const { userId } = useParams();
  const { data: userDetail } = useUserDetail(userId as string);

  const {
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<UserCreateInputType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      password: "",
      created_at: "",
      updated_at: "",
    },
    resolver: zodResolver(UserCreateInputSchema),
    values: userDetail,
  });

  const { mutate: createUser } = useUserCreate(setError);
  const { mutate: updateUser } = useUserUpdate(setError);

  const onSubmit: SubmitHandler<UserCreateInputType> = (data) => {
    if (userId) {
      updateUser(
        { id: userId as string, ...data },
        {
          onSuccess: () => {
            router.push(`/users/${userId}/detail`);
            toast.success("Cập nhật người dùng thành công");
          },
          onError: () => {
            toast.error("Cập nhật người dùng thất bại");
          },
        }
      );
      return;
    }

    createUser(data, {
      onSuccess: () => router.push("/users"),
    });
  };

  return (
    <FormLayout
      title={userId ? "Chỉnh sửa" : "Đăng kí người dùng"}
      onSubmit={handleSubmit(onSubmit)}
      isDirty={isDirty}
    >
      <Stack direction="row">
        <Stack spacing="1px">
          <Stack direction="row" alignItems="center" spacing={4}>
            <DetailItem
              label="ID"
              value={userDetail?.id ? userDetail.id : "-"}
            />

            <Select
              control={control}
              name="role"
              label="Quyền"
              labelLeft
              width="320px"
              placeholder="Quyền"
              options={ROLE_OPTIONS}
              hiddenEmpty
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="first_name"
              label="Họ"
              labelLeft
              width="320px"
              placeholder="Họ"
              disabled
            />

            <InputPassword
              control={control}
              name="password"
              label="Mật khẩu"
              labelLeft
              width="320px"
              placeholder="Mật khẩu"
              autoComplete="new-password"
              disabled
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="last_name"
              label="Tên"
              labelLeft
              width="320px"
              placeholder="Tên"
              disabled
            />

            <Input
              control={control}
              name="created_at"
              label="Ngày tạo"
              labelLeft
              width="320px"
              placeholder="Ngày tạo"
              disabled
            />
          </Stack>

          <Stack direction="row" gap={4}>
            <Input
              control={control}
              name="email"
              label="Email"
              labelLeft
              width="320px"
              placeholder="Email"
              disabled
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  );
};

export { UserForm };
