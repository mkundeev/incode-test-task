import { render, screen, fireEvent } from '@testing-library/react';
import FinanceTable from './FinanceTable';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const testData = [
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
  {
    ticker: 'GOOGL',
    exchange: 'NASDAQ',
    price: 164.27,
    change: 7.73,
    change_percent: 4.71,
    dividend: 0.22,
    yield: 0.95,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
  {
    ticker: 'MSFT',
    exchange: 'NASDAQ',
    price: 247.54,
    change: 14.26,
    change_percent: 5.76,
    dividend: 0.77,
    yield: 1.35,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
  {
    ticker: 'AMZN',
    exchange: 'NASDAQ',
    price: 112.14,
    change: -9.52,
    change_percent: -8.49,
    dividend: 0.17,
    yield: 0.96,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
  {
    ticker: 'FB',
    exchange: 'NASDAQ',
    price: 210.1,
    change: -6.69,
    change_percent: -3.18,
    dividend: 0.04,
    yield: 1.57,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
  {
    ticker: 'TSLA',
    exchange: 'NASDAQ',
    price: 149.38,
    change: 17.98,
    change_percent: 12.04,
    dividend: 0.83,
    yield: 1.62,
    last_trade_time: '2022-08-28T15:17:59.000Z',
  },
];

describe('FinanceTable', () => {
  test('should render FinanceTable', () => {
    render(
      <Provider store={store}>
        <FinanceTable data={testData} />
      </Provider>
    );
    const tableElement = screen.getByTestId('table');
    const tableBodyElement = screen.getByTestId('tableBody');
    expect(tableElement).toBeInTheDocument();
    expect(tableBodyElement.childElementCount).toBe(testData.length);
  });
});

describe('Menu', () => {
  test('should open on ticker cell click and close on filter click', async () => {
    render(
      <Provider store={store}>
        <FinanceTable data={testData} />
      </Provider>
    );
    const tickerCellElement = screen.getByTestId('tickerCell');
    let tickerMenu = screen.queryByTestId('tickersMenu');
    expect(tickerMenu).toBeNull();
    fireEvent.click(tickerCellElement);
    expect(screen.getByTestId('tickersMenu')).toBeInTheDocument();
    const filterBtnElement = screen.getByTestId('filterBtn');
    fireEvent.click(filterBtnElement);
    setTimeout(() => {
      tickerMenu = screen.queryByTestId('tickersMenu');
    }, 100);
    expect(tickerMenu).toBeNull();
  });
});
