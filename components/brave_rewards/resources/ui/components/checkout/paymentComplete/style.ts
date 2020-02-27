/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0 80px 0;

  > div {
    margin: 0 15px;

    > div:first-child {
      font-size: 22px;
      font-weight: 500;
      padding-bottom: 13px;
      color: #4B535C;
    }

    > div:last-child {
      font-family: ${p => p.theme.fontFamily.body};
      font-size: 16px;
    }
  }
`
