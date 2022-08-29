import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HistoryPage from './pages/HistoryPage';

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
