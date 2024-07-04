import React from 'react';
import bannerLogin from "../assets/images/login-banner.jpg"
import logo from "../assets/images/logo.svg"
import primary from "../assets/images/spotify-on-primary.svg"
import { useDispatch} from 'react-redux';
import { initiateAuth } from '../redux/features/responseSlice';
import { AppDispatch } from '../redux/store';

const Login: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = () => {
        dispatch(initiateAuth());
    }
    return (
        <div className="login-container">
            <article className="login-article">
                <div className=" rounded-[16px] overflow-hidden">
                    <img src={bannerLogin} alt="Login Banner" className="w-full  bg-center object-cover" />
                </div>
                <div className="wrapper bg-custom-bg bg-center rounded-[16px] w-full h-full text-center bg-no-repeat flex flex-col justify-between items-center custom-padding bg-[length:200%]">
                    <a href="/">
                        <img src={logo} alt="logo spotify" />
                    </a>
                    <div>
                        <h2 className='title headline-medium'>
                            <strong>Join us</strong>and embark on an incredible musical <strong>journey!</strong>
                        </h2>
                        <button onClick={() => handleLogin()}>
                            <img src={primary} alt="" />
                            <span>Continue with Spotify</span>
                            <div></div>
                        </button>
                    </div>
                    <p className='label-large bottom-text'>Powered by <a href="https://spotify.com" target='_blank'>Spotify</a></p>
                </div>
            </article>
        </div>
    );
}

export default Login;
