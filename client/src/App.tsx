import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import HistoryPage from './Pages/HistoryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/history/:ticker" element={<HistoryPage />}></Route>
      <Route path="/" element={<TickerPage />}></Route>
    </Routes>
  );
}

export default App;
