/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const ContinueBox = styled.div`
  font-size: 12px;
  display: flex;

  > div:nth-child(1) {
    flex-grow: 0;
    width: 18em;
  }

  > div:nth-child(2) {
    padding-right: 5px;
    flex-grow: 1;
    text-align: right;
  }

  svg {
    position: relative;
    top: 1px;
    left: 4px;
    height: 11px;
    width: 11px;
  }
`

export const ConfirmButtonRow = styled.div`
  margin: 25px 0 0;

  button {
    margin: 0 auto;
    width: 322px;
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

  > div:last-child {
    clear: both;
    padding-top: 10px;
  }

  span:first-of-type {
    margin: 12px 0 30px;
    position: relative;
    top: 0;
    left: 0;
    padding-left: 18px;
  }

  &.with-back-link {
    button {
      float: right;
      margin: 0;
      width: 231px;
    }
  }
`
