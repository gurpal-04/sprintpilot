"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import DashboardLayout from "./DashboardLayout";

export default function Layout({ children }) {
  const [auth, setAuth] = useState(null);
  const [onboardingDone, setOnboardingDone] = useState(false);

  const handleOnBoarding = () => {
    setOnboardingDone(true);
  };

  // useEffect(() => {
  //   const observer = new MutationObserver(() => {
  //     setAuth(!!Cookies.get("accessToken"));
  //   });

  //   observer.observe(document, {
  //     subtree: true,
  //     childList: true,
  //     attributes: true,
  //   });

  //   return () => observer.disconnect();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          {/* {auth ? (  */}
          {/* // && onboardingDone ? ( */}
          <DashboardLayout>{children}</DashboardLayout>
          {/* // ) : (
          //   <DefaultLayout handleOnBoarding={handleOnBoarding}>
          //     {children}
          //   </DefaultLayout>
          // )} */}
        </>
      </PersistGate>
    </Provider>
  );
}
