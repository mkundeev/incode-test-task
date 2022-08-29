import React from 'react';
import Container from '@mui/material/Container';
import HistoryTable from '../components/HistoryTable/HistoryTable';
import MoonLoader from 'react-spinners/MoonLoader';
import { useGetDataForTickerQuery } from '../redux/financeAPI';
import { useParams } from 'react-router-dom';
import { useGetDataHistoryType } from '../utils/ts-types';

export default function HistoryPage() {
  const { ticker } = useParams();
  const { data, isLoading } =
    useGetDataForTickerQuery<useGetDataHistoryType>(ticker);
  return (
    <Container sx={{ p: 5 }} data-testid="container">
      {isLoading && (
        <div className="loader">
          <MoonLoader color="#39f279" size={120} />
        </div>
      )}
      {!isLoading && <HistoryTable data={data.data} />}
    </Container>
  );
}
