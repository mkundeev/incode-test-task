import './App.css';
import Container from '@mui/material/Container';
import { useGetDataQuery } from './redux/financeAPI';
import FinanceTable from './components/FinanceTable/FinanceTable';
import { tikersType } from './utils/ts-types';

function App() {
  const { data, isLoading } = useGetDataQuery('');

  return <Container>{!isLoading && <FinanceTable data={data} />}</Container>;
}

export default App;
