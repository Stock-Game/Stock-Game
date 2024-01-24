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
});


// 3. The functions passed down should be invoked on click
// test("The functions passed down should be invoked on click", () => {
//     const myMock1 = jest.fn();

//     render(
//       <div>
//         <button oncClick={myMock1()}></button>
//       </div>
//     );

//     userEvent.click(screen.getByRole("button"));
//     expect(myMock1).toHaveBeenCalled();
//   });
