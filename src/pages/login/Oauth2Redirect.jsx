import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../ultis/api";
import { useDispatch } from "react-redux";
import { getCartByUserId } from "../home/addSlice";
import { loginUserGoogle } from "./loginSlice";
import Spinner from "../../components/spinner/Spinner";

function OAuth2RedirectHandler() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      loginGoogle();
  }, []);

  const loginGoogle = async () => {
    console.log("render");
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    console.log(token, refreshToken);
    if (token) {
      const result = await dispatch(loginUserGoogle({ jwt: token, refreshToken })).unwrap();
      console.log(result);
      if (result?.id) {
          dispatch(getCartByUserId(result.id));
      }
      window.location.href = "/";
    }
  }

  return <Spinner isLogin={true} />;
}

export default OAuth2RedirectHandler;