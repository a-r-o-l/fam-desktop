import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { buildingsApiService } from "../../services/buildingsApiService";
import { HeaderTitle } from "../../components/Header/HeaderTitle";

import { BuildingForm } from "./components/BuildingForm";
import {
  Box,
  Container,
  Group,
  Paper,
  Text,
  ActionIcon,
  Grid,
} from "@mantine/core";
import {
  FaBuilding,
  FaCircleCheck,
  FaTrashCan,
  FaEllipsisVertical,
} from "react-icons/fa6";
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
    <div className="flex flex-col flex-1">
      <HeaderTitle
        title="Complejos"
        description="crea / edita / elimina complejos"
      />
      <div className="flex flex-row gap-20 justify-center mt-20">
        <div className="flex flex-1 justify-end items-end">
          <BuildingForm />
        </div>
        <div className="flex w-1/3 flex-col">
          {buildings?.map((building) => (
            <div key={building.id}>
              <Container
                size="responsive"
                maw={600}
                miw={200}
                my={10}
                className=""
              >
                <Paper shadow="xl" radius="xl" p="xl" withBorder>
                  <Grid align="center" grow>
                    <Grid.Col span={1}>
                      <FaBuilding width={60} height={60} fontSize={30} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Text size="lg" fw={900}>
                        {building.name}
                      </Text>

                      <Text size="xs">{building.address}</Text>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <ActionIcon variant="subtle" color="gray">
                        <FaEllipsisVertical />
                      </ActionIcon>
                    </Grid.Col>
                  </Grid>
                </Paper>
              </Container>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
