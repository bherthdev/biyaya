/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Switcher from "../../components/Switcher";
import PageLoader from "../../components/PageLoader";
import biyayaLogo from "../../assets/biyaya_logo.png";
import { FaRegUser } from "react-icons/fa";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "list-disc mt-8 text-red-800 dark:text-red-300 text-xs tracking-wide" : null;

  if (isLoading) return <PageLoader />

  const content = (
    <div className="w-full h-screen flex flex-col items-center bg-biyaya bg-cover justify-center px-4">

      {/* <div className="flex items-center gap-2">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-400">Darkmode</p>
        <span className=""><Switcher /></span>
      </div> */}

      <div className="mt-7 overflow-x-auto border border-gray-400  dark:border-gray-800 shadow rounded-2xl overflow-hidden">
        <div className=" bg-gray-400 backdrop-blur-2xl bg-opacity-[45%] dark:bg-gray-900 px-10 py-8 sm:py-10 sm:px-28">

          <img src={biyayaLogo} className='h-[100px] xl:h-[130px] mx-auto' />
          <div className="sm:w-72 text-gray-600">
            <div className="text-center">
              <div className="mt-5 space-y-2">

                <h3 className="text-white dark:text-gray-300 text-xl font-bold tracking-widest font-sans">
                  Login
                </h3>
                <p className="text-white dark:text-gray-300 text-sm font-thin text-left pt-5">
                  Enter you login information to access the system.
                </p>
              </div>

              <ul className="list-inside">
                <li ref={errRef} className={errClass} aria-live="assertive">
                  {errMsg}
                </li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div className="relative">
                <label
                  htmlFor="UserEmail"
                  className="block overflow-hidden bg-white rounded-md border border-gray-200 px-3 pb-2 pt-1 shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400"
                >
                  <span className="text-xs text-gray-500"> Username: </span>

                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="current-password"
                    required={true}
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm font-semibold"
                  />
                  <div className="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-400 text-lg">

                    <FaRegUser size={20} className="mr-2" />

                  </div>


                </label>
              </div>

              <div className="relative">
                <label
                  htmlFor="UserEmail"
                  className="block overflow-hidden bg-white rounded-md border border-gray-200 px-3 pb-2 pt-1 shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400"
                >
                  <span className="text-xs text-gray-500"> Password: </span>

                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    autoComplete="off"
                    required
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm font-semibold"
                  />
                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-300 text-lg">

                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      <input
                        className="hidden js-password-toggle"
                        id="toggle"
                        type="checkbox"
                        onClick={togglePasswordVisiblity}
                      />
                      <label
                        className={`bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800  rounded-xl px-2 py-1 mt-1 text-lg text-gray-400 dark:text-gray-700 font-mono cursor-pointer js-password-label`}
                        htmlFor="toggle"
                      >
                        {passwordShown ? (
                          <AiOutlineEye size={20} />
                        ) : (
                          <AiOutlineEyeInvisible size={20} />
                        )}
                      </label>
                    </div>
                  </span>


                </label>
              </div>
              <div className="pb-3">
                <input
                  type="checkbox"
                  className="accent-slate-200"
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                />
                <label htmlFor="persist" className="pl-2 text-white font-thin tracking-wide">
                  Trust this device
                </label>
              </div>

              <button className="w-full px-4 py-3 font-sans text-white bg-[#1E1E1E] hover:bg-slate-700 active:bg-slate-800 rounded-full duration-150">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <p className="text-xs font-thin text-gray-300 dark:text-gray-400">Designed and developed by: </p>
  
        <a href='https://www.tyingknotworks.com/' 
          target='_blank' rel='noreferrer noopener'
          className=" font-normal text-xs text-gray-300 underline"
          >
            TyingKnot Works
          </a>
      </div>
    </div>
  );
  return content;
};

export default Login;
