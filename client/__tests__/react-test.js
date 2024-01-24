import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../components/App';
import Portfolio from '../components/Portfolio';
import PortfolioTicket from '../components/PortfolioTicket';
import OrderTicket from '../components/OrderTicket';

describe('Order Ticket', () => {
  let ticket;

  beforeEach(() => {
    ticket = render(<OrderTicket />);
  });

  test('should display order ticket', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Ticker')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Total Transaction Amount')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('Sell')).toBeInTheDocument();
  });

  test('contains buttons labeled Search and Submit', () => {
    // expect(ticket.getByText("Submit", { selector: "button" }));

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toHaveTextContent('Search');
    expect(buttons[1]).toHaveTextContent('Submit');
  });
  test('The functions passed down should be invoked on click', () => {
    const myMock1 = jest.fn();

    userEvent.click(screen.getByText('Search'));
    expect(myMock1).toHaveBeenCalled();
  });

  test('Transaction amount no more than 2 decimals', () => {
    const order = {
      price: 1.3333,
      quantity: 5,
    };

    const total = Math.ceil(order.price * order.quantity * 100) / 100;
    expect(total).toBe(6.67);
  });

  test('Snapshot test', () => {
    expect(OrderTicket).toMatchSnapshot();
  });
});
