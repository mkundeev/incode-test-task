
import './App.css';
import Container from '@mui/material/Container';
import { useGetDataQuery } from './redux/financeAPI';
import FinanceTable from './components/FinanceTable/FinanceTable';


function App() {

   const { data, isSuccess } = useGetDataQuery();

  
  return (
    <Container>
      {isSuccess && <FinanceTable data={data} />}
    </Container>
  );
}

export default App;
