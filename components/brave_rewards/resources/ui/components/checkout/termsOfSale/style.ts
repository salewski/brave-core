/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const Text = styled.div`
  font-family: ${p => p.theme.fontFamily.body};
  font-size: 12px;
  text-align: center;

  a {
    font-weight: bold;
    color: #333;
  }
`
