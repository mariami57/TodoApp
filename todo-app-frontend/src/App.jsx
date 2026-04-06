import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "./pages/Home.jsx"
import { Login } from "./pages/Login.jsx";
// import { Profile } from "./pages/Profile.jsx";
// import { Tasks } from "./pages/Tasks/Tasks.jsx";
import { AddTask } from "./pages/Tasks/AddTask.jsx";
import { Register } from "./pages/Accounts/Register.jsx"
import './App.css'

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/user/",{
      credentials: "include",
    })

      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }


  return (

    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/profile/:id" element={<Profile />} /> */}
      <Route path="/tasks/">
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
