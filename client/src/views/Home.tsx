import { useDispatch, useSelector } from "react-redux";
import { axiosUser } from "../redux/features/responseSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state:RootState) => state.auth.dataMe);
    useEffect(() => {
        dispatch(axiosUser())
    })
    console.log(userData)
    return (
        <div>
            {userData}
        </div>
    );
};
