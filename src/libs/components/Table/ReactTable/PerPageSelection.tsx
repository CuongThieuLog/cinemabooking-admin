import { mono } from "@/libs/config/theme";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { usePaginationHandler } from "./hooks";

const PerPageSelect = () => {
  const { setPageSize, pageSize, handleChangePagination } =
    usePaginationHandler();

  return (
    <Stack
      gap={1}
      right={0}
      width={158}
      direction="row"
      alignItems="center"
      flex={1}
      justifyContent="flex-end"
    >
      <Select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          typeof handleChangePagination === "function" &&
            handleChangePagination({
              page: 1,
              per_page: Number(e.target.value),
            });
        }}
        IconComponent={(props) => (
          <Image
            {...props}
            width={12}
            height={8}
            alt="select arrow icon"
            src="/assets/svgs/select_arrow.svg"
            style={{ top: "50%", transform: "translateY(-50%)", right: 16 }}
          />
        )}
        sx={{
          width: 80,
          height: 40,
          "& .MuiSelect-outlined": {
            fontWeight: 500,
            color: mono[600],
          },
        }}
      >
        {[5, 10, 50, 100].map((pageSize) => (
          <MenuItem key={pageSize} value={pageSize}>
            {pageSize}
          </MenuItem>
        ))}
      </Select>

      <Typography variant="body2" color={mono[600]}>
        Bản ghi
      </Typography>
    </Stack>
  );
};

export { PerPageSelect };
