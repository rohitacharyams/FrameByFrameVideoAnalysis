import { useEffect } from "react";
import Sidebar from "./SideBar";
import { useAuth } from "../../firebase/authContext";
import { useNavigate } from "react-router-dom";
import ReelsPage from "./ReelsPage";

function HomePageAuth() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, [isLoggedIn, navigate]);

    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow">
          <ReelsPage />
        </div>
      </div>
    );
}

export default HomePageAuth;