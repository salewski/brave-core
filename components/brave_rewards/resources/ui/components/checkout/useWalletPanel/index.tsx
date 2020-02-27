/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { BatColorIcon } from 'brave-ui/components/icons'
import { Button } from 'brave-ui/components'

import { FormSection } from '../formSection'
import { TermsOfSale } from '../termsOfSale'

import {
  Content,
  WalletInfoPanel,
  ActionPanel,
  BatAmount,
  ExchangeAmount,
  LastUpdated
} from './style'

interface ActionButtonProps {
  onClick: () => void
}

function PayWithWalletButton (props: ActionButtonProps) {
  return <Button text={'Pay with BAT'} size={'medium'} onClick={props.onClick} />
}

function AddFundsButton (props: ActionButtonProps) {
  return <Button text={'Add Funds'} size={'medium'} onClick={props.onClick} />
}

function NotEnoughFundsMessage (props: {}) {
  return <span>You don't have enough tokens to buy this item.</span>
}

interface UseWalletPanelProps {
  balance: number
  balanceConverted: string
  lastUpdated: string
  hasSufficientFunds?: boolean
  rewardsEnabled?: boolean
  walletVerified?: boolean
  onShowAddFunds: () => void
  onPayWithWallet: () => void
}

export function UseWalletPanel (props: UseWalletPanelProps) {
  if (!props.rewardsEnabled) {
    return null
  }

  return (
    <>
      <FormSection title={'Use your token balance'}>
        <Content>
          <WalletInfoPanel>
            <BatAmount>
              <BatColorIcon />{props.balance.toFixed(1)}
            </BatAmount>
            <ExchangeAmount>{props.balanceConverted}</ExchangeAmount>
            <LastUpdated>Updated {props.lastUpdated}</LastUpdated>
          </WalletInfoPanel>
          <ActionPanel>
            {
              props.hasSufficientFunds
                ? <PayWithWalletButton onClick={props.onPayWithWallet} />
                : props.walletVerified
                  ? <AddFundsButton onClick={props.onShowAddFunds} />
                  : <NotEnoughFundsMessage />
            }
          </ActionPanel>
        </Content>
      </FormSection>
      {
        props.hasSufficientFunds &&
          <TermsOfSale text={'By clicking Pay with BAT, you agree to $1Brave’s Terms of Sale$2.'} />
      }
    </>
  )
}
