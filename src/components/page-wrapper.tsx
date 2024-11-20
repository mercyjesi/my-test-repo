import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageHeader } from "./page-header";
import { PageFooter } from "./page-footer";

const PageWrapperStyled = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageWrapperContent = styled("main")`
  height: 100%;
  width: 100%;
  min-height: 400px;
`;

export const PageWrapper = () => (
  <PageWrapperStyled>
    <PageHeader />
    <PageWrapperContent>
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PageWrapperContent>
    <PageFooter />
  </PageWrapperStyled>
);
