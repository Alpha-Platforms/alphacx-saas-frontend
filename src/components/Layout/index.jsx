import React, { useEffect, useContext, useState } from "react";
import {connect} from 'react-redux';
// 
import Sidebar from "./Sidebar";
import Navbar from "./Navbar.jsx";
import OnboardingModal from './components/OnboardingModal';
import { LayoutContext } from "../../context/layoutContext";
// 
import "./layout.css";

const Index = ({user, isUserAuthenticated, ...props}) => {
  // 
  const [open, setOpen] = useState(false);
  const [onboardingSplashScreen, setOnboardingSplashScreen] = useState(false)
  // 
  const hideOnboardingModal = () => setOpen(false);
  const openOnboardingModal = () => setOpen(true);
  // 
  useEffect(() => {
        if (isUserAuthenticated) {
          setOpen(true);
          let onboardingSplash = localStorage.getItem("onboardingSplash")
          if(!onboardingSplash || onboardingSplash == "hide"){
              setOnboardingSplashScreen(true);
          }else{
              setOnboardingSplashScreen(false);
          }
        }
  }, [isUserAuthenticated]);

  return (
    <React.Fragment>
      <div className="general-wrapper">
        <div id="hideNav">
          <Navbar
            browserRouter={props.browserRouter}
            routeType={props.routeType}
            fullProps={props.fullProps}
            pageName={props.pageName}
          />
        </div>

        <Sidebar
          browserRouter={props.browserRouter}
          currentRoute={props.currentRoute}
        />
        <section className="app-container">{props.children}</section>
      </div>
      {onboardingSplashScreen ? 
        <OnboardingModal open={open} hide={hideOnboardingModal} setOpen={openOnboardingModal} />
        : null
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => ({
    user: state.userAuth.user,
    isUserAuthenticated: state.userAuth.isUserAuthenticated
});

export default connect(mapStateToProps, null)(Index);
