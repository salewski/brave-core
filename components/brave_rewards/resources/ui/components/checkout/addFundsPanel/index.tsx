/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { Button } from 'brave-ui/components'
import { BatColorIcon } from 'brave-ui/components/icons'

import { LocaleContext } from '../localeContext'
import { FormSection } from '../formSection'
import { CreditCardForm, CreditCardFormHandle, CreditCardDetails } from '../creditCardForm'
import { TermsOfSale } from '../termsOfSale'
import { GoBackLink } from '../goBackLink'

import {
  Subtitle,
  CurrentBalance,
  ExchangeRateDisplay,
  AmountOptionContainer,
  AmountOptionExchange,
  ChargeSummary,
  PurchaseButtonRow
} from './style'

interface AddFundsAmountOption {
  amount: number
  amountConverted: string
  transactionFeeRate: string
  transactionFee: string
  totalCharge: string
}

interface AddFundsPanelProps {
  amountNeeded: number
  walletBalance: number
  walletBalanceConverted: string
  unitValueConverted: string
  amountOptions: AddFundsAmountOption[]
  onCancel: () => void
  onPayWithCreditCard: (cardDetails: CreditCardDetails) => void
}

export function AddFundsPanel (props: AddFundsPanelProps) {
  if (props.amountOptions.length === 0) {
    throw new Error('props.amountOptions cannot be an empty array')
  }

  const locale = React.useContext(LocaleContext)
  const [selectedAmount, setSelectedAmount] = React.useState<number>(0)

  let selectedOption = props.amountOptions[0]
  for (const option of props.amountOptions) {
    if (option.amount < props.amountNeeded) {
      throw new Error('An amount in props.amountOptions is less than props.amountNeeded')
    }
    if (option.amount === selectedAmount) {
      selectedOption = option
      break
    }
  }

  const creditCardFormRef = React.useRef<CreditCardFormHandle>(null)

  const onPurchaseClick = () => {
    const formHandle = creditCardFormRef.current
    if (formHandle) {
      const errors = formHandle.validate()
      if (errors.length === 0) {
        props.onPayWithCreditCard(formHandle.details)
      } else {
        errors[0].element.focus()
      }
    }
  }

  return (
    <>
      <h1>{locale.get('addFundsTitle')}</h1>
      <Subtitle>
        {locale.get('addFundsSubtitle')}
      </Subtitle>
      <CurrentBalance>
        <div>
          {locale.get('currentBalance')}
          <span className='balance-bat'>
            {props.walletBalance.toFixed(1)} {locale.get('bat')}
          </span>
          <span className='balance-converted'>
            {props.walletBalanceConverted}
          </span>
        </div>
        <div>
          {props.amountNeeded} {locale.get('batNeeded')}
        </div>
      </CurrentBalance>
      <FormSection title={`1. ${locale.get('selectAmountToAdd')}`}>
        <ExchangeRateDisplay>
          <BatColorIcon /> 1 {locale.get('bat')} = {props.unitValueConverted}
        </ExchangeRateDisplay>
        <AmountOptionContainer>
          {
            props.amountOptions.map(option => {
              const selectAmount = () => { setSelectedAmount(option.amount) }

              return (
                <div key={option.amount}>
                  <Button
                    text={`${option.amount} ${locale.get('bat')}`}
                    size={'medium'}
                    onClick={selectAmount}
                    className={option === selectedOption ? 'selected-amount' : ''}
                  />
                  <AmountOptionExchange>
                    {option.amountConverted}
                  </AmountOptionExchange>
                </div>
              )
            })
          }
        </AmountOptionContainer>
        <ChargeSummary>
          <div>{locale.get('transactionFee')} ({selectedOption.transactionFeeRate})</div>
          <div>{selectedOption.transactionFee}</div>
          <div>{locale.get('orderTotal')}</div>
          <div>{selectedOption.totalCharge}</div>
        </ChargeSummary>
      </FormSection>
      <FormSection title={`2. ${locale.get('enterCreditCardInfo')}`}>
        <CreditCardForm handleRef={creditCardFormRef} />
      </FormSection>
      <PurchaseButtonRow>
        <GoBackLink onClick={props.onCancel} />
        <Button text={locale.get('addFundsButtonText')} size='medium' onClick={onPurchaseClick} />
        <TermsOfSale text={locale.get('addFundsTermsOfSale')} />
      </PurchaseButtonRow>
    </>
  )
}
