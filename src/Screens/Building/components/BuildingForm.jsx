import { Button, Label } from "flowbite-react";
import { useCreateBuildingMutation } from "../../../services/hooks/Building/useBuildingMutation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    address: yup.string().required("La dirección es requerida"),
  })
  .required();

export const BuildingForm = () => {
  const createBuilding = useCreateBuildingMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    createBuilding.mutateAsync(data);
    if (createBuilding.isSuccess) {
      console.log("success");
    }
  };

  return (
    <form
      className="flex w-1/2 flex-col gap-5 border rounded-lg p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="nombre" />
        </div>
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              id="name"
              variant="outlined"
              type="text"
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  overflow: "hidden",
                },
              }}
            />
          )}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="address" value="direccion" />
        </div>
        <Controller
          name="address"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.address}
              required
              helperText={errors?.address?.message}
              id="address"
              variant="outlined"
              type="text"
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  overflow: "hidden",
                },
              }}
            />
          )}
        />
      </div>
      <div className="mt-10 w-full flex px-20">
        <Button
          type="submit"
          color="blue"
          pill
          isProcessing={createBuilding.isPending}
          fullSized
        >
          Registrar
        </Button>
      </div>
    </form>
  );
};
