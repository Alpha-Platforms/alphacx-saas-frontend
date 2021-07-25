import React, { useContext } from "react";
import Layout from "../Layout/index.jsx";
import { Route } from "react-router-dom";
import { LayoutContext } from "../../context/layoutContext";

const DefaultLayout = ({ children, routeType, ...rest }) => {
  let browserRouter = children.props.history.push;
  let fullProps = children.props;
  let currentRoute = children.props.location.pathname;

  const { appReduceSidebarWidth } = useContext(LayoutContext);

  return (
    <Layout
      routeType={routeType}
      currentRoute={currentRoute}
      browserRouter={browserRouter}
      fullProps={fullProps}
    >
      <div
        className={`${
          appReduceSidebarWidth === true
            ? "section-wrap mt-2"
            : "section-wrap mt-2 reduceAppPadding"
        }`}
      >
        {children}
      </div>
    </Layout>
  );
};

const DefaultLayoutRoute = ({
  component: Component,
  routeType,
  fullProps,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return (
          <DefaultLayout
            routeType={routeType}
            page={rest.page}
            fullProps={fullProps}
          >
            <Component {...matchProps} />
          </DefaultLayout>
        );
      }}
    />
  );
};
export default DefaultLayoutRoute;
