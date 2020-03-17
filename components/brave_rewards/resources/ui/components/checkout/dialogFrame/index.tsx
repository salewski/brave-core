/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { CloseStrokeIcon, BatColorIcon } from 'brave-ui/components/icons'

import { LocaleContext } from '../localeContext'

import {
  MainPanel,
  Content,
  TopBar,
  DialogTitle,
  CloseButton
} from './style'

export interface DialogFrameProps {
  onClose: () => void
  children: React.ReactNode
  showTitle?: boolean
  showBackground?: boolean
}

export function DialogFrame (props: DialogFrameProps) {
  const locale = React.useContext(LocaleContext)
  return (
    <MainPanel className={props.showBackground ? 'with-background' : ''}>
      <TopBar>
        {
          !props.showTitle ? null : <>
            <DialogTitle>
              <BatColorIcon /> {locale.get('batCheckout')}
            </DialogTitle>
          </>
        }
        <CloseButton onClick={props.onClose}>
          <CloseStrokeIcon />
        </CloseButton>
      </TopBar>
      <Content>
        {props.children}
      </Content>
    </MainPanel>
  )
}
