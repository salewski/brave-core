/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { Button } from 'brave-ui/components'
import { BatColorIcon } from 'brave-ui/components/icons'

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
      <h1>Add Funds</h1>
      <Subtitle>
        Add BAT to your wallet using your credit card
      </Subtitle>
      <CurrentBalance>
        <div>
          Current balance
          <span className='balance-bat'>{props.walletBalance.toFixed(1)} BAT</span>
          <span className='balance-converted'>{props.walletBalanceConverted}</span>
        </div>
        <div>
          {props.amountNeeded} BAT needed
        </div>
      </CurrentBalance>
      <FormSection title={'1. Select amount to add'}>
        <ExchangeRateDisplay>
          <BatColorIcon /> 1 BAT = {props.unitValueConverted}
        </ExchangeRateDisplay>
        <AmountOptionContainer>
          {
            props.amountOptions.map(option => {
              const selectAmount = () => { setSelectedAmount(option.amount) }

              return (
                <div key={option.amount}>
                  <Button
                    text={`${option.amount} BAT`}
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
          <div>Transaction Fee ({selectedOption.transactionFeeRate})</div>
          <div>{selectedOption.transactionFee}</div>
          <div>Order Total</div>
          <div>{selectedOption.totalCharge}</div>
        </ChargeSummary>
      </FormSection>
      <FormSection title={'2. Enter credit card info'}>
        <CreditCardForm handleRef={creditCardFormRef} />
      </FormSection>
      <PurchaseButtonRow>
        <GoBackLink onClick={props.onCancel} />
        <Button text={'Add Funds & Purchase'} size='medium' onClick={onPurchaseClick} />
        <TermsOfSale text={'By clicking Add Funds & Purchase, you agree to $1Brave’s Terms of Sale$2.'} />
      </PurchaseButtonRow>
    </>
  )
}
