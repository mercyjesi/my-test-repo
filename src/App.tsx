import { Route, Routes } from "react-router";
import { PageWrapper } from "./components/page-wrapper";
import { ChatsPage } from "./pages/chats-page";
import { HomePage } from "./pages/home-page";

export const App = () => (
  <Routes>
    <Route path="/" element={<PageWrapper />}>
      <Route key="chats" path="chats" element={<ChatsPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Route>
  </Routes>
);

export default App;
