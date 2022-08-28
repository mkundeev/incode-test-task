import Container from '@mui/material/Container';
import { useGetDataQuery } from './redux/financeAPI';
import FinanceTable from './components/FinanceTable/FinanceTable';
import { useGetDataType } from './utils/ts-types';

function App() {
  const { data, isLoading } = useGetDataQuery<useGetDataType>('');

  return (
    <Container sx={{ p: 5 }}>
      {!isLoading && <FinanceTable data={data} data-testid="finance-table" />}
    </Container>
  );
}

export default App;
