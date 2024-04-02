import { Button, Label } from "flowbite-react";
import { useCreateBuildingMutation } from "../../../services/hooks/Building/useBuildingMutation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, TextInput } from "@mantine/core";
import { useEffect } from "react";

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
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <Input.Wrapper>
              <Input.Label>Nombre</Input.Label>
              <Input {...field} value={field.value} error={!!errors?.name} />
              <Input.Error h={10}>{errors?.name?.message || ""}</Input.Error>
            </Input.Wrapper>
          )}
        />
      </div>
      <div>
        <Controller
          name="address"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <Input.Wrapper>
              <Input.Label>Direccion</Input.Label>
              <Input {...field} value={field.value} error={!!errors?.address} />
              <Input.Error h={10}>{errors?.address?.message || ""}</Input.Error>
            </Input.Wrapper>
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
