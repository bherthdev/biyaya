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
    <div className="w-full h-screen flex flex-col items-center bg-slate-100 dark:bg-black justify-center px-4">
      
      <div className="flex items-center gap-2">
      <p className="text-sm font-bold text-gray-900 dark:text-gray-400">Darkmode</p>
        <span className=""><Switcher /></span>
      </div> 

      <div className="mt-7 overflow-x-auto border border-gray-200  dark:border-gray-800 shadow rounded-lg overflow-hidden">
       <div className="space-y-6  bg-white dark:bg-gray-900 px-7 py-8 sm:px-12">
          <div className="max-w-sm x w-full text-gray-600">
            <div className="text-center">
              {/* <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" alt="logo"/> */}
              <div className="mt-5 space-y-2">
              
                <h3 className="text-gray-800 dark:text-gray-300 text-xl font-bold ">
                  Log in to your account
                </h3>
              </div>

              <ul className="list-inside">
                <li ref={errRef} className={errClass} aria-live="assertive">
                {errMsg}
                </li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="font-medium dark:text-gray-400"
                >
                  Username
                </label>
                <input
                  className=" w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                  type="text"
                  id="username"
                  ref={userRef}
                  value={username}
                  onChange={handleUserInput}
                  autoComplete="current-password"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-medium dark:text-gray-400 "
                >
                  Password
                </label>
                <div className="relative w-full">
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
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </label>
                  </div>
                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    autoComplete="off"
                    required
                    className="w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                  />
                </div>
              </div>
              <div className="pb-3">
                <input
                  type="checkbox"
                  className="accent-slate-800"
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                />
                <label htmlFor="persist" className="pl-2">
                  Trust This Device
                </label>
              </div>

              <button className="w-full px-4 py-2 text-white font-medium bg-slate-600 hover:bg-slate-700 active:bg-slate-800 rounded-sm duration-150">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default Login;
