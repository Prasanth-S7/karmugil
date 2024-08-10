import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './components/custom-component/themeContext';
import { Home } from './screens/Home';
import { Tracking } from './screens/Tracking';
import { Transport } from './screens/Transport';
import { Login } from './screens/Login';
import { Toaster } from "@/components/ui/toaster"
import { Floodhub} from './screens/FloodHub';
import { Settings } from './screens/Settings';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/floodhub" element={<Floodhub />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
};
export default App;
