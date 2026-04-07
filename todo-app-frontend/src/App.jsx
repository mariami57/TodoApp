import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx"
import { Login } from "./pages/Accounts/Login.jsx";
// import { Profile } from "./pages/Profile.jsx";
// import { Tasks } from "./pages/Tasks/Tasks.jsx";
import { AddTask } from "./pages/Tasks/AddTask.jsx";
import { Register } from "./pages/Accounts/Register.jsx"
import './App.css'

function App() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/profile/:id" element={<Profile />} /> */}
      <Route path="/tasks">
        <Route path="add" element={<AddTask />} />
      </Route> 

      <Route path="/accounts/">
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>  
    </Routes>

  )
}

export default App
