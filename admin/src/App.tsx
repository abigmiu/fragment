import { BrowserRouter, Routes, useRoutes } from "react-router-dom";
import routeConfig from "./route/route";

function App() {
    const routes = useRoutes(routeConfig);
    return routes;
}

export default App;
