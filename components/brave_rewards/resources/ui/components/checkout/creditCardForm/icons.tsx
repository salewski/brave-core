/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

function Unknown () {
  return (
    <svg width='21' height='16' xmlns='http://www.w3.org/2000/svg'>
      <path d='M17.865 15.556H2.552C1.145 15.556 0 14.246 0 12.639V2.917C0 1.309 1.145 0 2.552 0h15.313c1.407 0 2.552 1.309 2.552 2.917v9.722c0 1.608-1.145 2.917-2.552 2.917zM2.552 13.61h15.313c.47 0 .85-.435.85-.972V6.806H1.701v5.833c0 .537.381.972.851.972zM18.715 2.917c0-.537-.38-.973-.85-.973H2.552c-.47 0-.85.436-.85.973v.972h17.013v-.972z' fill='#B3BFD1' fillRule='evenodd' fillOpacity='.668' />
    </svg>
  )
}

export function getCreditCardIcon (type: string) {
  switch (type) {
    default: return Unknown
  }
}
