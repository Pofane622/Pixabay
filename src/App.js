import { Route, Routes } from 'react-router';
import './App.css';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/search/SearchPage';
import { useState } from 'react';
import { ImageDetails } from './pages/ImageDetails/ImageDetails';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); 

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  return (

    <div className={`app ${isDarkMode? "dark-mode" : "light-mode"}`}>
      <div>
        <NavBar  isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
      <div className='app-body'>
        <Routes>
          <Route 
          path='/'
          element={<HomePage />}
          />

          <Route 
          path='/images'
          element={<SearchPage />}
          />

          <Route 
          path='/images/:id'
          element={<ImageDetails />}
          />
        </Routes>
      </div>
    </div>

  )
}

export default App;
