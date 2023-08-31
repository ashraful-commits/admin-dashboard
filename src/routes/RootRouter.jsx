import { createBrowserRouter } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

const RootRouter = createBrowserRouter([...PublicRouter, ...PrivateRouter]);

export default RootRouter;
