
import Login from '../Login';
import Register from '../Register';
import Header from '../Header';
import Main from '../Main/Main';
import Footer from '../Footer';
import { Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <Routes>
      <Route
      path="/main"
      element= {
        <div className="page">
                <Header  />
               
                <Footer />
              </div>
      }/>
    <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
    </Routes>
  )
}

export default App
