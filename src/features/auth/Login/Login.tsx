"use client";

import { login } from "@/libs/api/auth";
import { useAuth } from "@/libs/context";
import { ErrorTypeResponse } from "@/libs/types/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputSchema, LoginInputType } from "./type";
import { Input, InputPassword } from "@/libs/components/Form";

const Login = () => {
  const router = useRouter();
  const { setAccessToken, setAdmin } = useAuth();
  const { control, handleSubmit, setError } = useForm<LoginInputType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginInputSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { admin_info, ...token } = data.data;
      setAccessToken(token.access_token);
      setAdmin(admin_info);
      router.push("/");
    },
    onError: (error: ErrorTypeResponse) => {
      const { data: responseData } = error.response || {};
      const errorMessage = responseData?.message;
      const errorValidation = responseData?.errors;
      if (errorMessage) {
        setError("email", { message: errorMessage });
      }

      if (errorValidation) {
        const { email, password } = errorValidation;

        if (email) {
          setError("email", { message: email });
        }

        if (password) {
          setError("password", { message: password });
        }
      }
    },
  });

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    mutate(data);
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgcolor="white"
    >
      <Stack
        mb="53px"
        gap="39px"
        width={400}
        component="form"
        textAlign="center"
        position="relative"
        borderRadius={"4px"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "&:before": {
            content: '""',
            position: "absolute",
            left: "-5px",
            top: "-5px",
            width: "calc(100% + 10px)",
            height: "calc(100% + 10px)",
            background:
              "linear-gradient(45deg, #000 0%, rgba(255, 255, 255, 1) 42%, rgba(255, 255, 255, 1) 59%, #BD191C 100%)",
            borderRadius: "4px",
          },
        }}
      >
        <Stack
          width="100%"
          bgcolor="white"
          height="100%"
          zIndex="10"
          padding={"32px 16px"}
        >
          <Stack
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            mb={"32px"}
          >
            <Typography variant="h2" fontWeight={500} color="base.primary">
              CINEMA
            </Typography>
            /
            <Typography variant="h2" color="grey.900">
              BOOKING
            </Typography>
          </Stack>

          <Stack gap={12}>
            <Stack gap={1}>
              <Input
                control={control}
                autoComplete="email"
                name="email"
                placeholder="Email"
                label="Email"
                required
              />

              <InputPassword
                control={control}
                autoComplete="new-password"
                name="password"
                placeholder="Mật khẩu"
                label="Mật khẩu"
                required
              />
            </Stack>

            <Button variant="contained" type="submit" disabled={isPending}>
              Đăng nhập
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { Login };
