/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { BatColorIcon } from 'brave-ui/components/icons'
import { Button } from 'brave-ui/components'

import { LocaleContext, LocaleData } from '../localeContext'
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
  locale: LocaleData,
  onClick: () => void
}

function PayWithWalletButton (props: ActionButtonProps) {
  return <Button text={props.locale.get('payWithBat')} size={'medium'} onClick={props.onClick} />
}

function AddFundsButton (props: ActionButtonProps) {
  return <Button text={props.locale.get('addFundsLinkText')} size={'medium'} onClick={props.onClick} />
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

  const locale = React.useContext(LocaleContext)

  return (
    <>
      <FormSection title={locale.get('useTokenBalance')}>
        <Content>
          <WalletInfoPanel>
            <BatAmount locale={locale}>
              <BatColorIcon />{props.balance.toFixed(1)}
            </BatAmount>
            <ExchangeAmount>{props.balanceConverted}</ExchangeAmount>
            <LastUpdated>{locale.get('updated')} {props.lastUpdated}</LastUpdated>
          </WalletInfoPanel>
          <ActionPanel>
            {
              props.hasSufficientFunds
                ? <PayWithWalletButton locale={locale} onClick={props.onPayWithWallet} />
                : props.walletVerified
                  ? <AddFundsButton locale={locale} onClick={props.onShowAddFunds} />
                  : <span>{locale.get('notEnoughFunds')}</span>
            }
          </ActionPanel>
        </Content>
      </FormSection>
      {
        props.hasSufficientFunds &&
          <TermsOfSale text={locale.get('payWithBatTermsOfSale')} />
      }
    </>
  )
}
