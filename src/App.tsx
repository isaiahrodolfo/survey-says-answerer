import { Routes, Route } from "react-router-dom";
import NamePage from "./pages/NamePage";
import QuestionsPage from "./pages/QuestionsPage";
import SuccessPage from "./pages/SuccessPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NamePage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
};

export default App;
