/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import { Container, BatAmount, ExchangeAmount } from './style'

interface OrderSummaryProps {
  description: string
  orderTotal: number
  orderTotalConverted: string
}

export function OrderSummary (props: OrderSummaryProps) {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Item Selected</th>
            <th>Order Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {props.description}
            </td>
            <td>
              <BatAmount>
                {props.orderTotal.toFixed(1)}
              </BatAmount>
              <ExchangeAmount>
                {props.orderTotalConverted}
              </ExchangeAmount>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
