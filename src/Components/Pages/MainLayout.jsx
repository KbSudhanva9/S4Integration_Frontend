import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const MainLayout = () => {
    return(
        <>
            <Header />
            <div style={{marginTop: '60px'}}>
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout;