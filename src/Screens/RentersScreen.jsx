import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Input,
  Menu,
  Space,
  Table,
  rem,
  Select as MSelect,
  useMantineColorScheme,
  Box,
} from "@mantine/core";
import { HeaderTitle } from "../components/Header/HeaderTitle";
import { useGetRentersQuery } from "../services/hooks/Renter/useRenterQuery";
import mockData from "../MOCK_DATA.json";
import { FaEllipsisVertical, FaTrashCan } from "react-icons/fa6";
import { FaUserLarge, FaBuilding } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { TbFileReport } from "react-icons/tb";
import { useMemo, useState } from "react";
import { useGetBuildingsQuery } from "../services/hooks/Building/useBuildingQuery";
import { textFormat } from "../utils/textFormat";

const arr = [
  { id: 1, label: "avatar" },
  { id: 2, label: "nombre" },
  { id: 3, label: "apellido" },
  { id: 4, label: "dni" },
  { id: 5, label: "tel" },
  { id: 6, label: "complejo" },
  { id: 7, label: "depto" },
  { id: 8, label: "monto" },
  { id: 9, label: "acciones" },
];

export const RentersScreen = () => {
  const { colorScheme } = useMantineColorScheme();

  const switchColor = useMemo(() => {
    return colorScheme === "dark" ? "white" : "black";
  }, [colorScheme]);

  const { data: renters } = useGetRentersQuery();
  const { data: buildings } = useGetBuildingsQuery();

  const [searchParam, setSearchParam] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("todos");

  const buildingSelectData = useMemo(() => {
    let data = [{ label: "Todos", value: "todos" }];
    if (buildings) {
      data = [
        ...data,
        ...buildings.map((building) => {
          return {
            label: textFormat([building?.name], "allcapitalize"),
            value: building.id.toString(),
          };
        }),
      ];
    }

    return data || [];
  }, [buildings]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <HeaderTitle
        title="INQUILINOS"
        description="crea / edita / elimina inquilinos"
      />
      <Space mt={40} />
      <Group grow gap="xs" align="center" justify="flex-start">
        <Group preventGrowOverflow maw={300}>
          <FaBuilding />
          <MSelect
            data={buildingSelectData}
            value={selectedBuilding}
            onChange={(e) => {
              setSelectedBuilding(e);
            }}
            fullWidth
            size="md"
            comboboxProps={{ shadow: "md" }}
            // styles={{
            //   dropdown: {
            //     color: switchColor,
            //   },
            //   input: {
            //     color: switchColor,
            //     borderColor: switchColor,
            //   },
            // }}
          />
        </Group>
        <Group preventGrowOverflow maw={300}>
          <FaUserLarge />
          <Input
            placeholder="Buscar inquilino"
            value={searchParam}
            onChange={({ target }) => setSearchParam(target.value)}
            size="md"
          />
        </Group>
      </Group>
      {/* <Group mt={20} maw={600}>
        <FaBuilding className="w-6 h-6" />
        <MSelect
          data={buildingSelectData}
          value={selectedBuilding}
          onChange={(e) => {
            setSelectedBuilding(e);
          }}
          fullWidth
          size="md"
          comboboxProps={{ shadow: "md" }}
          styles={{
            dropdown: {
              color: switchColor,
            },
            input: {
              color: switchColor,
              borderColor: switchColor,
            },
          }}
        />
      </Group> */}
      <Space mt={40} />
      <Table.ScrollContainer minWidth={900} type="native" mah={600}>
        <Table stickyHeader striped="even" withTableBorder verticalSpacing={20}>
          <Table.Thead>
            <Table.Tr>
              {arr.map((item) => (
                <Table.Th key={item.id}>{item.label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockData
              .filter((item) => item.name.includes(searchParam))
              .map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <Avatar src={item.image_url} />
                  </Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.lastname}</Table.Td>
                  <Table.Td>{item.dni}</Table.Td>
                  <Table.Td>{item.phone}</Table.Td>
                  <Table.Td>{item?.Building?.name}</Table.Td>
                  <Table.Td>{item.apartment}</Table.Td>
                  <Table.Td>{item.fee}</Table.Td>
                  <Table.Td>
                    <Menu>
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <FaEllipsisVertical />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={
                            <TbFileReport
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                        >
                          Reporte
                        </Menu.Item>
                        <Menu.Item
                          leftSection={
                            <FaPencilAlt
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                        >
                          Editar
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={
                            <FaTrashCan
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                        >
                          Eliminar
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};
