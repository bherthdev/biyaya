/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { IoNotificationsOutline } from "react-icons/io5";
import { useGetLogsQuery, useUpdateLogMutation } from "../features/UserLogs/logsApiSlice";
import PageError from "./PageError";
import LogsComponent from "./LogsComponent";
import { useGetActivitiesQuery, useUpdateActivityMutation } from "../features/UserLogs/activitiesApiSlice";
import UserLastLogin from "./UserLastLogin";
import { LuClock3 } from "react-icons/lu";


const DashHeader = ({ headerName }) => {
  const navigate = useNavigate();
  const [userNav, setUserNav] = useState(false);
  const [notif, setNotif] = useState(false);
  const [notifAdmin, setNotifAdmin] = useState(false);
  const [logTab, setLogTab] = useState("activity");
  const [colorChange, setColorChange] = useState(false);
  const { id, isAdmin, name, position, avatar, biyaya_secret } = useAuth();
  const menuRef = useRef();
  const notifRef = useRef();

  const {
    data: LogsData,
    isLoading: isLoadingLogs,
    isSuccess: isLogsSuccess,
    isError: isLogsError,
    error: logsError,
  } = useGetLogsQuery("logsList", {
    pollingInterval: 10000, // refresh data every 10 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: ActivitiesData,
    isLoading: isLoadingActivities,
    isSuccess: isActivitiesSuccess,
    isError: isActivitiesError,
    error: activitiesError,
  } = useGetActivitiesQuery("activitiesList", {
    pollingInterval: 10000, // refresh data every 10 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [updateLog, { isLoading: isLoadingLog, isSuccess: isSuccessLog, isError: isErrorLog, error: errorLog }] =
    useUpdateLogMutation();

  const [updateActivity, { isLoading: isLoadingActivity, isSuccess: isSuccessActivity, isError: isErrorActivity, error: errorActivity }] =
    useUpdateActivityMutation();


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserNav(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotif(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setColorChange(window.scrollY >= 1);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const handleKeyDown = (event) => {

      if (event.ctrlKey && event.shiftKey && event.key === 'B' && event.altKey) {
        const userPassword = prompt("Please enter the password:");

        if (userPassword === biyaya_secret) {
          alert("Access granted!");
          // Perform the action for authorized users here
          setNotifAdmin(prev => !prev)
        } else if (userPassword === null) {
          alert("Password entry cancelled.");
        } else {
          alert("Incorrect password. Access denied!");
        }

      }
    };


    // Call the function when needed


    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);



  const handleSettingsClick = () => {
    navigate(`/settings/${id}`);
    setUserNav(!userNav);
  };
  const handleNotifClick = () => {
    setNotif(!notif);
  };

  const navClass = colorChange
    ? 'border-b z-30 sticky top-0 w-full dark:border-b-slate-800 ease-in-out duration-300'
    : 'ease-in-out duration-300';

  const getHeaderName = () => {
    switch (headerName) {
      case '/dashboard':
        return 'Dashboard';
      case '/inventory':
        return 'Inventory';
      case '/orders':
        return 'Orders';
      case '/pos':
        return 'POS';
      default:
        return 'Settings';
    }
  };


  const onUpdateLog = async (log) => {
    if (log.seen) {
      alert(JSON.stringify(log, null, 2))
    } else {
      const result = await updateLog({ id: log.id, seen: log.seen })
      if (result) alert(JSON.stringify(log, null, 2))
    }
  }

  const onUpdateActivity = async (activity) => {
    const result = await updateActivity({ id: activity.id, seen: activity.seen })
  }

  if (isLoadingLogs || isLoadingActivities) return (
    <div className={`bg-white dark:bg-slate-900 sm:px-8 border flex ${navClass} h-20 sm:h-32 items-center justify-between px-4 right-0`}>
      <div className="flex items-center">
        <p className="flex">
          <span className="sr-only">Logo</span>
          <span className="inline-block text-gray-700 dark:text-gray-200 text-2xl sm:text-3xl font-semibold">
            {getHeaderName()}
          </span>
        </p>
      </div>

      <div className="flex items-center justify-end">
        <nav aria-label="Site Nav" className="hidden lg:flex lg:gap-4  lg:text-gray-300" />
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center divide-x divide-gray-100 border-gray-200 dark:border-l-gray-900 dark:border-r-gray-900">

            <div className="flex gap-4">

              <div className="inline-flex bg-white dark:bg-slate-900 rounded-full" ref={menuRef}>

                <div className="relative">
                  <button
                    onClick={() => setUserNav(!userNav)}
                    type="button"
                    className="group flex shrink-0 items-center rounded-lg transition"
                  >
                    <span className="sr-only">Menu</span>

                    <img
                      alt="Profile"
                      src={avatar}
                      className="h-12 w-12 sm:h-13 sm:w-13 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                    />
                    <div className="ml-1 sm:mr-2 hidden sm:flex flex-col tracking-wide text-left">
                      <h1 className="font-medium text-xs sm:text-md text-gray-800 dark:text-gray-200 capitalize">
                        {name}
                      </h1>
                      <p className="text-gray-400 font-light text-[10px] sm:text-sm">{position}</p>
                    </div>
                    {isAdmin && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`mx-2 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block ${userNav && "rotate-180"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  {isAdmin && userNav && (
                    <div className="absolute right-0 z-50 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mt-2 w-48 rounded-md shadow-lg">
                      <div className="block top-[-7px] bg-white h-3 w-3 border-t border-l rotate-45 absolute right-3"></div>

                      <div className="py-2">
                        <span
                          onClick={handleSettingsClick}
                          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-400"
                        >
                          Account Setting
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  if (isLogsError || isActivitiesError) return <PageError error={logsError?.data?.message} />

  if (isLogsSuccess && isActivitiesSuccess) {

    const { entities: logsEntities } = LogsData;
    const { entities: activitiesEntities } = ActivitiesData;

    const logs = Object.values(logsEntities).sort((a, b) => new Date(b.date) - new Date(a.date))

    const activities = Object.values(activitiesEntities).sort((a, b) => new Date(b.date) - new Date(a.date))

    const hasSeen = logs.some(log => log?.seen === false) || activities.some(activity => activity?.seen === false);


    return (
      <div className={`bg-white dark:bg-slate-900 no-print sm:px-8 border flex ${navClass} h-20 sm:h-32 items-center justify-between px-4 right-0`}>
        <div className="flex items-center">
          <p className="flex">
            <span className="sr-only">Logo</span>
            <span className="inline-block text-gray-700 dark:text-gray-200 text-2xl sm:text-3xl font-semibold">
              {getHeaderName()}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-end">
          <nav aria-label="Site Nav" className="hidden lg:flex lg:gap-4  lg:text-gray-300" />

          <div className="flex justify-between items-center gap-2">

            <div className="relative">

              <div
                onClick={() => setNotif(prev => !prev)}

                className="flex cursor-pointer items-center relative rounded-lg border border-gray-100 dark:bg-slate-800 p-2 text-gray-800 dark:text-gray-300 hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                {hasSeen &&
                  <div className="absolute animate-pulse p-1 w-2 h-2 rounded-full bg-red-600  top-1 right-1"></div>
                }
                <span>
                  <IoNotificationsOutline size={20} />
                </span>
              </div>
              {notif &&
                <div ref={notifRef} className="absolute right-[-60px] sm:right-0 z-50 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mt-2 w-auto rounded-md shadow-lg">
                  <div className="pt-3 px-4  flex -mt-[52px]">
                    <div onClick={() => setLogTab(prev => prev = "activity")}
                      className={`${logTab === `activity` ? `bg-white border-t border-l border-r` : `bg-gray-100 border`} px-5 py-2  rounded-t-xl cursor-pointer`}>
                      Activity
                    </div>
                    {notifAdmin &&
                      <div onClick={() => setLogTab(prev => prev = "lastViewed")}
                        className={`${logTab === `lastViewed` ? `bg-white border-t border-l border-r` : `bg-gray-100 border`} px-5 py-2  rounded-t-xl cursor-pointer`}>
                        Last viewed
                      </div>
                    }
                  </div>
                  <div className="block -top-[7px] bg-white h-3 w-3 border-t border-l rotate-45 absolute right-[71px] sm:right-3 "></div>

                  <div className="w-[20rem]  sm:w-[25rem] z-50">

                    {/* <div className="h-72 overflow-auto">
                      {logs.map((log, idx) => (
                        <div
                          key={idx}
                          onClick={() => onUpdateLog(log)}
                          className={`${!log?.seen && `bg-slate-200`} flex hover:bg-gray-50 cursor-pointer justify-between items-center gap-3 py-4 px-5 border-b text-sm`}>
                          <div className="flex gap-3 relative ">
                            <img
                              alt="Profile"
                              src={log.avatar}
                              className="h-10 w-10 rounded-lg object-cover "
                            />
                            <div>
                              <h2 className="font-semibold">{log.name}</h2>
                              <p title={log.date} className="text-gray-500 text-xs font-l"><UserLastLogin lastLoginTime={log.date} /></p>
                            </div>
                          </div>
                          <div className="text-xs font-light text-right text-gray-500 w-24 ">
                            <h2 className="text-wrap">{log?.deviceInfo?.device}</h2>
                            <h2 className="text-wrap">{log?.deviceInfo?.platform}</h2>
                          </div>
                        </div>
                      ))}

                    </div> */}
                    {logTab === `lastViewed`
                      ? <LogsComponent logs={logs} onUpdateLog={onUpdateLog} />
                      : <div className="h-72 overflow-auto rounded">
                        {activities.length
                          ? activities.map((activity, idx) => (
                            <div
                              key={idx}
                              onClick={() => onUpdateActivity(activity)}
                              className={`${!activity?.seen && `border-l-4 border-l-red-400`} flex hover:bg-gray-50 cursor-pointer justify-between items-center gap-3 py-4 px-5 border-b text-sm`}>

                              <div className="flex gap-6 relative ">
                                <div title={activity.date} className="flex gap-1 items-center whitespace-nowrap">
                                  <LuClock3 size={13} className="text-gray-500" />
                                  <UserLastLogin lastLoginTime={activity.date} />

                                </div>
                                <div className="text-xs flex gap-2 justify-center items-center">
                                  <img
                                    title={activity.name}
                                    alt="Profile"
                                    src={activity.avatar}
                                    className="h-10 w-10 rounded-full object-cover "
                                  />
                                  <div className="flex flex-col justify-center">
                                    <h2 className="text-wrap font-semibold">{activity?.actionType}</h2>
                                    <h2 className="text-wrap text-gray-600">{activity?.description}</h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                          : <div className="flex">
                            <p className="mx-auto my-5 text-gray-500">No logs found!</p>
                          </div>
                        }

                      </div>
                    }
                  </div>
                </div>
              }
            </div>

            <div className="flex items-center  rounded-full   divide-x divide-gray-100 dark:border-l-gray-900 dark:border-r-gray-900">

              <div className="flex gap-4">

                <div className="inline-flex bg-white dark:bg-slate-900 rounded-full"
                  ref={menuRef}>

                  <div className="relative">
                    <button
                      onClick={() => setUserNav(!userNav)}
                      type="button"
                      className="group flex shrink-0 items-center rounded-lg transition"
                    >
                      <span className="sr-only">Menu</span>

                      <img
                        alt="Profile"
                        src={avatar}
                        className="h-12 w-12 sm:h-13 sm:w-13 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                      />
                      <div className="ml-1 sm:mr-2 hidden sm:flex flex-col tracking-wide text-left">
                        <h1 className="font-medium text-xs sm:text-md text-gray-800 dark:text-gray-200 capitalize">
                          {name}
                        </h1>
                        <p className="text-gray-400 font-light text-[10px] sm:text-sm">{position}</p>
                      </div>
                      {isAdmin && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`mx-2 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block ${userNav && "rotate-180"}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    {isAdmin && userNav && (
                      <div className="absolute right-0 z-50 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mt-2 w-48 rounded-md shadow-lg">
                        <div className="block top-[-7px] bg-white h-3 w-3 border-t border-l rotate-45 absolute right-3"></div>

                        <div className="py-2">
                          <span
                            onClick={handleSettingsClick}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-400"
                          >
                            Account Setting
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }



};

export default DashHeader;
