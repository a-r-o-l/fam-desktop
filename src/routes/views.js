import { PaymentsScreen } from "../Screens/Payments/PaymentsScreen";
import { BuildingScreen } from "../Screens/Building/BuildingScreen";
import { RentersScreen } from "../Screens/RentersScreen";
const views = [
  {
    path: "/payments",
    component: PaymentsScreen,
    exact: true,
    name: "Pagos",
  },
  {
    path: "/buildings",
    name: "Complejos",
    component: BuildingScreen,
  },
  {
    path: "/renters",
    name: "Inquilinos",
    component: RentersScreen,
  },
  {
    path: "/analiticas",
    name: "Analiticas",
    component: RentersScreen,
  },
  {
    path: "/opciones",
    name: "Opciones",
    component: RentersScreen,
  },
  {
    path: "/renter/:id",
    component: RentersScreen,
  },
];

export default views;
