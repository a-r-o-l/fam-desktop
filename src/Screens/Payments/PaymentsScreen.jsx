import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PaymentCard } from "./components/PaymentCard";
import { textFormat } from "../../utils/textFormat";
import { useGetPaymentQuery } from "../../services/hooks/Payment/usePaymentQuery";
import { useGetRentersQuery } from "../../services/hooks/Renter/useRenterQuery";
import { useGetBuildingsQuery } from "../../services/hooks/Building/useBuildingQuery";
import { HeaderTitle } from "../../components/Header/HeaderTitle";
import { FaUserLarge } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import { Select as MSelect, useMantineColorScheme } from "@mantine/core";

export const PaymentsScreen = () => {
  const { colorScheme } = useMantineColorScheme();

  const switchColor = useMemo(() => {
    return colorScheme === "dark" ? "white" : "black";
  }, [colorScheme]);

  const [selectedRenter, setSelectedRenter] = useState("todos");
  const [selectedBuilding, setSelectedBuilding] = useState("todos");

  const { data: payments, refetch: refetchPayments } = useGetPaymentQuery({
    buildingId: selectedBuilding || "",
    renterId: selectedRenter || "",
  });
  const { data: renters, refetch: refetchRenters } = useGetRentersQuery({
    buildingId: selectedBuilding || "",
  });
  const { data: buildings } = useGetBuildingsQuery();

  useEffect(() => {
    refetchPayments();
    refetchRenters();
  }, [selectedBuilding, selectedRenter, refetchPayments, refetchRenters]);

  useEffect(() => {
    if (selectedBuilding !== "todos") {
      setSelectedRenter("todos");
    }
  }, [selectedBuilding]);

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

  const rentersSelectData = useMemo(() => {
    let data = [{ label: "Todos", value: "todos" }];
    if (renters) {
      data = [
        ...data,
        ...renters.map((renter) => {
          return {
            label: textFormat(
              [renter?.name, renter?.lastname],
              "allcapitalize"
            ),
            value: renter.id.toString(),
          };
        }),
      ];
    }

    return data || [];
  }, [renters]);

  return (
    <div className="flex flex-1 flex-col p-10 h-full">
      <HeaderTitle title="Pagos" />
      <div className="w-1/2 flex self-center mt-20 gap-10">
        <div className="w-1/3 flex flex-row items-center gap-5">
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
        </div>
        <div className="w-1/3 flex flex-row items-center gap-5">
          <FaUserLarge className="w-6 h-6" />
          <MSelect
            data={rentersSelectData}
            value={selectedRenter}
            onChange={(e) => {
              setSelectedRenter(e);
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
        </div>
      </div>

      <div className="w-full h-96 flex flex-col gap-2 justify-center items-center mt-5">
        {payments?.length ? (
          payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        ) : (
          <div className="flex flex-1 justify-center items-center h-full p-10">
            <Typography variant="h5" color="GrayText">
              No hay pagos
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
