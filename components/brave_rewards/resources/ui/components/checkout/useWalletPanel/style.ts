/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

import { LocaleData } from '../localeContext'

export const Content = styled<{}, 'div'>('div')`
  display: flex;
`

export const WalletInfoPanel = styled.div`
  flex-grow: 1;
`

export const ActionPanel = styled.div`
  flex-grow: 0;
  padding-right: 4px;
  max-width: 185px;

  button {
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
`

export const BatAmount = styled.span<{ locale: LocaleData }>`
  font-size: 22px;
  padding-left: 26px;
  position: relative;
  top: 0;
  left: 0;

  &::after {
    content: "${p => p.locale.get('bat')}";
    padding-left: 5px;
    font-size: 18px;
  }

  svg {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 4px;
    left: 0;
  }
`

export const ExchangeAmount = styled.span`
  color: #999;
  padding-left: 10px;
`

export const LastUpdated = styled.div`
  font-family: ${p => p.theme.fontFamily.body};
  font-size: 12px;
  color: #666;
  padding-top: 10px;
`
