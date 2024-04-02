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
];

export default views;
