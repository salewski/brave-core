/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { Button } from 'brave-ui/components'
import { CaratStrongRightIcon } from 'brave-ui/components/icons'

import { LocaleContext } from '../localeContext'
import { FormSection } from '../formSection'
import { CreditCardForm, CreditCardDetails, CreditCardFormHandle } from '../creditCardForm'
import { TermsOfSale } from '../termsOfSale'
import { GoBackLink } from '../goBackLink'

import { ContinueBox, ConfirmButtonRow } from './style'

interface UseCreditCardPanelProps {
  hasSufficientFunds?: boolean
  rewardsEnabled?: boolean
  walletVerified?: boolean
  continueWithCard?: boolean
  setContinueWithCard: (value: boolean) => void
  onPayWithCreditCard: (cardDetails: CreditCardDetails) => void
}

export function UseCreditCardPanel (props: UseCreditCardPanelProps) {
  const locale = React.useContext(LocaleContext)
  const onBack = () => { props.setContinueWithCard(false) }
  const onContinue = () => { props.setContinueWithCard(true) }

  const creditCardFormRef = React.useRef<CreditCardFormHandle>(null)

  const onConfirmClick = () => {
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

  const title = props.rewardsEnabled && !props.continueWithCard
    ? locale.get('useCreditCard')
    : locale.get('enterCreditCardInfo')

  const showForm =
    props.continueWithCard ||
    !props.rewardsEnabled ||
    (!props.hasSufficientFunds && !props.walletVerified)

  React.useEffect(() => {
    if (showForm && creditCardFormRef.current) {
      creditCardFormRef.current.focus()
    }
  }, [showForm])

  if (showForm) {
    return (
      <div>
        <FormSection title={title}>
          <CreditCardForm handleRef={creditCardFormRef} />
        </FormSection>
        <ConfirmButtonRow className={props.continueWithCard ? 'with-back-link' : ''}>
          {props.continueWithCard && <GoBackLink onClick={onBack} />}
          <Button text={locale.get('confirmButtonText')} size='medium' onClick={onConfirmClick} />
          <TermsOfSale text={locale.get('confirmTermsOfSale')} />
        </ConfirmButtonRow>
      </div>
    )
  }

  return (
    <FormSection title={title}>
      <ContinueBox>
        <div>
          {locale.get('continueWithCreditCardMessage')}
        </div>
        <div>
          <a href='javascript:void 0' onClick={onContinue}>
            {locale.get('continueWithCreditCard')}
            <CaratStrongRightIcon />
          </a>
        </div>
      </ContinueBox>
    </FormSection>
  )
}
