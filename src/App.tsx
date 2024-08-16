import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./common/context/authContext";
import { Login } from "./custom/pages/login/login";
import { Register } from "./custom/pages/register/register";
import { ToastContainer } from "react-toastify";
import { TodosCreate } from "./custom/pages/todosCreate/todosCreate";
import { TodosUpdate } from "./custom/pages/todosUpdate/todosUpdate";
import { Todos } from "./custom/pages/todos/todos";

export const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Todos />} />
          <Route path="/create" element={<TodosCreate />} />
          <Route path="/update/:id" element={<TodosUpdate />} />
        </Routes>
      </Router>
      <ToastContainer theme="colored" />
    </AppContextProvider>
  );
};
