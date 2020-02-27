/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import { Box } from './style'

interface FormSectionProps {
  title: string
  children: React.ReactNode
}

export function FormSection (props: FormSectionProps) {
  return (
    <Box>
      <h2>{props.title}</h2>
      {props.children}
    </Box>
  )
}
