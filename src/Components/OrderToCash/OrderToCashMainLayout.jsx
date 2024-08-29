import { Outlet } from "react-router-dom";
import OrderToCashHeader from "./OrderToCashHeader";

const OrderToCashMainLayout = () => {
    return(
        <>
            <OrderToCashHeader />
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default OrderToCashMainLayout;