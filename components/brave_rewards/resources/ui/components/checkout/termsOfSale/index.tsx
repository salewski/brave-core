/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import { Text } from './style'

interface TermsOfSaleProps {
  text: string
}

export function TermsOfSale (props: TermsOfSaleProps) {
  const [
    before,
    linkText = 'Brave’s Terms of Sale',
    after = ''
  ] = props.text.split(/\$\d+/g)

  // TODO: link URL
  return (
    <Text>
      {before}<a href='javascript:void 0'>{linkText}</a>{after}
    </Text>
  )
}
