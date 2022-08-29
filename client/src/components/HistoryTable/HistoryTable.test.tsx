import { render, screen } from '@testing-library/react';
import HistoryTable from './HistoryTable';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { MemoryRouter } from 'react-router-dom';

const testData = [
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
  {
    _id: '2',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 164.27,
    change: 7.73,
    change_percent: 4.71,
    dividend: 0.22,
    yield: 0.95,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
  {
    _id: '3',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 247.54,
    change: 14.26,
    change_percent: 5.76,
    dividend: 0.77,
    yield: 1.35,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
  {
    _id: '4',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 112.14,
    change: -9.52,
    change_percent: -8.49,
    dividend: 0.17,
    yield: 0.96,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
  {
    _id: '5',
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: 210.1,
    change: -6.69,
    change_percent: -3.18,
    dividend: 0.04,
    yield: 1.57,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
];

describe('HistoryTable', () => {
  test('should render HistoryTable', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HistoryTable data={testData} />
        </MemoryRouter>
      </Provider>
    );
    const tableElement = screen.getByTestId('tableHistory');
    const tableBodyElement = screen.getByTestId('tableBody');
    expect(tableElement).toBeInTheDocument();
    expect(tableBodyElement.childElementCount).toBe(testData.length);
  });
});
