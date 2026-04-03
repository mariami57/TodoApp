import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Tasks from "./pages/Tasks/Tasks.jsx";
import AddTask from "./pages/Tasks/AddTask.jsx";
import './App.css'

function App() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/add" element={<AddTask />} />
    </Routes>

  )
}

export default App
