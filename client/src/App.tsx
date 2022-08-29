import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import HistoryPage from './Pages/HistoryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/history/:ticker" element={<HistoryPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
}

export default App;
