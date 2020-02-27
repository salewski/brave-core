/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const Subtitle = styled.div`
  text-align: center;
  font-family: ${p => p.theme.fontFamily.body}
  font-size: 15px;
  margin: -10px 0 25px 0;
`

export const CurrentBalance = styled.div`
  padding: 10px 0 0;
  border-top: solid 1px ${p => p.theme.color.separatorLine};
  display: flex;
  justify-content: space-between;

  > div:last-child {
    text-align: right;
    color: #009F61;
    font-weight: 500;
  }

  .balance-bat {
    padding-left: 7px;
    font-size: 16px;
    font-weight: 500;
  }

  .balance-converted {
    padding-left: 7px;
    color: #9E9FAB;
  }
`

export const PurchaseButtonRow = styled.div`
  margin: 25px 0 0;

  button {
    float: right;
    width: 231px;
    background: ${p => p.theme.color.brandBat};
    border-color: ${p => p.theme.color.brandBat};

    &:hover {
      background: ${p => p.theme.color.brandBatInteracting};
      border-color: ${p => p.theme.color.brandBatInteracting};
    }

    &:active {
      background: ${p => p.theme.color.brandBatActive};
      border-color: ${p => p.theme.color.brandBatActive};
    }
  }

  > span:first-of-type {
    margin-top: 12px;
  }

  > div:last-child {
    clear: both;
    padding-top: 15px;
  }
`

export const ExchangeRateDisplay = styled.div`
  font-size: 12px;
  color: #8B97A9;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 15px;

  svg {
    height: 20px;
    width: 20px;
    margin-right: 2px;
    position: relative;
    top: 5px;
    left: 0;
  }
`

export const AmountOptionContainer = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > div {
    margin: 0 10px 12px;
    text-align: center;
  }

  button {
    min-width: 98px;
    background: transparent;
    border-color: ${p => p.theme.color.brandBat};
    margin-bottom: 7px;
    color: ${p => p.theme.color.brandBat};
  }

  button.selected-amount {
    background: ${p => p.theme.color.brandBat};
    color: #fff;
  }
`

export const AmountOptionExchange = styled.div`
  font-family: ${p => p.theme.fontFamily.body};
  font-size: 11px;
  color: #838391;
`

export const ChargeSummary = styled.div`
  padding: 13px 4px 5px;
  border-top: solid 1px ${p => p.theme.color.separatorLine};
  display: grid;
  grid-template-columns: auto minmax(auto, 84px);

  > div {
    text-align: right;
  }

  > :last-child {
    font-weight: 500;
  }

  > :nth-child(n + 3) {
    padding-top: 10px;
    font-size: 16px;
  }
`
