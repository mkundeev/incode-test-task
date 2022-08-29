import Container from '@mui/material/Container';
import { useGetDataQuery } from '../redux/financeAPI';
import FinanceTable from '../components/FinanceTable/FinanceTable';
import { useGetDataType } from '../utils/ts-types';
import MoonLoader from 'react-spinners/MoonLoader';

export default function MainPage() {
  const { data, isLoading } = useGetDataQuery<useGetDataType>('');
  return (
    <Container sx={{ p: 5 }} data-testid="container">
      {isLoading && (
        <div className="loader">
          <MoonLoader color="#39f279" size={120} />
        </div>
      )}
      {!isLoading && <FinanceTable data={data} />}
    </Container>
  );
}
