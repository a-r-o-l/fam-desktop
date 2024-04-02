import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { buildingsApiService } from "../../services/buildingsApiService";
import { HeaderTitle } from "../../components/Header/HeaderTitle";

import { BuildingForm } from "./components/BuildingForm";
import { Text } from "@mantine/core";

export const BuildingScreen = () => {
  const [buildings, setBuildings] = useState([]);

  const getBuildings = async () => {
    const response = await buildingsApiService.getBuildings();
    if (response) {
      setBuildings(response);
      console.log(response);
    }
  };

  useEffect(() => {
    getBuildings();
  }, []);

  return (
    <div className="flex flex-col p-10 flex-1">
      <HeaderTitle title="Complejos" />
      <div className="flex flex-row gap-20 justify-center mt-20">
        <div className="flex flex-1 justify-end items-end">
          <BuildingForm />
        </div>
        <div className="flex w-1/3 flex-col">
          {buildings?.map((building) => (
            <div
              key={building.id}
              className="flex flex-col flex-1 justify-center"
            >
              <Text>
                {building.name}
              </Text>
              <Text>
                {building.address}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
