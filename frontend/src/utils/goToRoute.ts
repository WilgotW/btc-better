import { useNavigate } from "react-router-dom";
import { routes, TypeOfRoutes } from "./routeType";

export default function goToRoute(route: TypeOfRoutes) {
  const navigate = useNavigate();
  return (route: TypeOfRoutes) => {
    navigate(route);
  };
}
