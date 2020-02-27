/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

import backgroundSrc from './assets/dialog_bg.svg'

export const MainPanel = styled.div`
  overflow: hidden;
  position:relative;
  top: 0;
  left: 0;
  max-width: 548px;
  background: #fff;
  font-weight: normal;
  font-family: ${p => p.theme.fontFamily.heading};
  font-size: 14px;

  a {
    color: ${p => p.theme.color.brandBat};
  }

  &.with-background {
    background-image: url(${backgroundSrc});
    background-repeat: no-repeat;
    background-position: bottom right;
  }
`

export const TopBar = styled<{}, 'div'>('div')`
  padding: 15px 18px 15px 32px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: ${p => p.theme.color.gray600};
  font-weight: 500;
  font-family: ${p => p.theme.fontFamily.heading};
  font-size: 12px;
  text-transform: uppercase;
`

export const DialogTitle = styled<{}, 'span'>('span')`
  svg {
    position: absolute;
    top: 14px;
    left: 14px;
    height: 14px;
    width: auto;
  }
`

export const CloseButton = styled<{}, 'button'>('button')`
  top: 22px;
  right: 22px;
  position: absolute;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 14px;
  height: 14px;
  color: #999;
`

export const Content = styled<{}, 'div'>('div')`
  padding: 51px 49px 35px;

  h1 {
    margin: 0 0 20px 0;
    text-align: center;
    font-weight: 500;
    font-family: ${p => p.theme.fontFamily.heading};
    font-size: 22px;
    color: ${p => p.theme.color.gray800};
  }
`
