/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const Container = styled.div`
  width: 270px;
  margin: 25px auto 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  input {
    margin-top: 6px;
    border: 1px solid #DFDFE8;
    border-radius: 3px;
    padding: 8px 10px;
    outline: unset;
    font-size: 14px;
    font-family: ${p => p.theme.fontFamily.body};
    width: 100%;

    &:focus {
      border-color: #A1A8F2;
    }

    &.invalid {
      border-color: red;
    }
  }
`

export const CardNumber = styled.div`
  grid-column: 1 / 3;
  margin-bottom: 20px;
`

export const Expiration = styled.div`
  margin-bottom: 20px;
`

export const SecurityCode = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
`

export const SaveThisCard = styled.div`
  grid-column: 1 / 3;
  position: relative;
  top: 0;
  left: 0;

  label > div {
    margin-top: 0;
    position: absolute;
    top: -5px;
    right: 2px;
  }
`
