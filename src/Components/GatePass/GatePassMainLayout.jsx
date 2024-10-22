import { Outlet } from "react-router-dom";
import GatePassHeader from "./GatePassHeader";

const GatePassMainLayout = () => {
    return(
        <>
            <GatePassHeader />
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default GatePassMainLayout;