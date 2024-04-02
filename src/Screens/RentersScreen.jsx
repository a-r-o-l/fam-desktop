import { HeaderTitle } from "../components/Header/HeaderTitle";
import { useGetRentersQuery } from "../services/hooks/Renter/useRenterQuery";
const arr = [
  { id: 1, label: "avatar" },
  { id: 2, label: "nombre" },
  { id: 3, label: "apellido" },
  { id: 4, label: "dni" },
  { id: 5, label: "tel" },
  { id: 6, label: "complejo" },
  { id: 7, label: "depto" },
  { id: 8, label: "monto" },
];

export const RentersScreen = () => {
  const { data } = useGetRentersQuery();
  console.log(data);
  return (
    <div className="flex flex-1 flex-col p-10 h-dvh overflow-hidden">
      <HeaderTitle title="Inquilinos" />
      <div className="flex flex-1 flex-col w-full border rounded-md mt-20 h-[60vh]">
        <div className="h-10 grid grid-cols-8 w-full items-center border-b px-2 py-10">
          {arr.map((item) => (
            <div key={item.id} className="">
              {item.label}
            </div>
          ))}
        </div>
        {data?.map((item) => (
          <div className="h-10 grid grid-cols-8 w-full items-center px-2">
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.image_url}
            </div>
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.name}
            </div>
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.lastname}
            </div>
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.dni}
            </div>
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.phone}
            </div>
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.Building.name}
            </div>
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.apartment}
            </div>
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap "
            >
              {item.fee}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
