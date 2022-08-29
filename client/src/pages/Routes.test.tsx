import { render, screen, fireEvent } from '@testing-library/react';
import FinanceTable from '../components/FinanceTable/FinanceTable';
import HistoryTable from '../components/HistoryTable/HistoryTable';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { MemoryRouter } from 'react-router-dom';

const testFinanceData = [
  {
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 118.15,
    change: 13.31,
    change_percent: 11.27,
    dividend: 0.47,
    yield: 1.4,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
];

const testHistoryData = [
  {
    _id: '1',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 118.15,
    change: 13.31,
    change_percent: 11.27,
    dividend: 0.47,
    yield: 1.4,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
];

describe('FinanceTable', () => {
  test('should go to history page on click on historylink and go back on gotomain click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FinanceTable data={testFinanceData} />
          <HistoryTable data={testHistoryData} />
        </MemoryRouter>
      </Provider>
    );
    const backToMainLink = screen.getByTestId('linkToMain');
    const toHistoryLink = screen.getByTestId('linkToHistory');
    fireEvent.click(toHistoryLink);
    expect(screen.getByTestId('tableHistory')).toBeInTheDocument();
    fireEvent.click(backToMainLink);
    expect(screen.getByTestId('tableMain')).toBeInTheDocument();
  });

  test('wrong page navigate to main', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/Appp123']}>
          <FinanceTable data={testFinanceData} />
          <HistoryTable data={testHistoryData} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('tableMain')).toBeInTheDocument();
  });
});
