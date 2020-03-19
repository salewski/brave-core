/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import {
  WidgetWrapper,
  Copy,
  BuyPromptWrapper,
  FiatInputWrapper,
  FiatInputField,
  FiatDropdown,
  CaratDropdown,
  AssetDropdown,
  AssetDropdownLabel,
  ActionsWrapper,
  ConnectButton,
  Header,
  StyledTitle,
  BinanceIcon,
  StyledTitleText,
  AssetItems,
  AssetItem
} from './style'
import { StyledTitleTab } from '../widgetTitleTab'
import currencyData from './data'
import BinanceLogo from './assets/binance-logo'
import { CaratDownIcon } from 'brave-ui/components/icons'
import { getLocale } from '../../../../common/locale'

interface State {
  initialAmount: string
  initialFiat: string
  initialAsset: string
  fiatShowing: boolean
  currenciesShowing: boolean
}

interface Props {
  showContent: boolean
  userTLD: NewTab.BinanceTLD
  onShowContent: () => void
  onBuyCrypto: (coin: string, amount: string, fiat: string) => void
  onBinanceUserTLD: (userTLD: NewTab.BinanceTLD) => void
}

export default class Binance extends React.PureComponent<Props, State> {
  private fiatList: string[]
  private usCurrencies: string[]
  private comCurrencies: string[]

  constructor (props: Props) {
    super(props)
    this.state = {
      initialFiat: 'USD',
      initialAmount: '',
      initialAsset: 'BTC',
      fiatShowing: false,
      currenciesShowing: false
    }
    this.fiatList = currencyData.fiatList
    this.usCurrencies = currencyData.usCurrencies
    this.comCurrencies = currencyData.comCurrencies
  }

  componentDidMount () {
    // Storybook
    if (chrome.hasOwnProperty('binance')) {
      chrome.binance.getUserTLD((userTLD: NewTab.BinanceTLD) => {
        this.props.onBinanceUserTLD(userTLD)
      })
    }
  }

  setInitialAsset (asset: string) {
    this.setState({
      initialAsset: asset,
      currenciesShowing: false
    })
  }

  setInitialFiat (fiat: string) {
    this.setState({
      initialFiat: fiat,
      fiatShowing: false
    })
  }

  handleFiatChange = () => {
    const { userTLD } = this.props

    if (userTLD === 'us' || this.state.currenciesShowing) {
      return
    }

    this.setState({
      fiatShowing: !this.state.fiatShowing
    })
  }

  toggleCurrenciesShowing = () => {
    this.setState({ currenciesShowing: !this.state.currenciesShowing })
  }

  setInitialAmount = (e: any) => {
    const { value } = e.target

    if (isNaN(parseInt(value, 10)) && value.length > 0) {
      return
    }

    this.setState({ initialAmount: e.target.value })
  }

  renderTitle () {
    return (
      <Header>
        <StyledTitle>
          <BinanceIcon>
            <BinanceLogo />
          </BinanceIcon>
          <StyledTitleText>
            {'Binance'}
          </StyledTitleText>
        </StyledTitle>
      </Header>
    )
  }

  renderTitleTab () {
    const { onShowContent } = this.props

    return (
      <StyledTitleTab onClick={onShowContent}>
        {this.renderTitle()}
      </StyledTitleTab>
    )
  }

  renderBuyView = () => {
    const { onBuyCrypto, userTLD } = this.props
    const {
      initialAsset,
      initialFiat,
      initialAmount,
      fiatShowing,
      currenciesShowing
    } = this.state
    const isUS = userTLD === 'us'
    const currencies = isUS ? this.usCurrencies : this.comCurrencies

    return (
      <>
        <Copy>
          {getLocale('binanceWidgetBuyCrypto')}
        </Copy>
        <BuyPromptWrapper>
          <FiatInputWrapper>
            <FiatInputField
              type={'text'}
              placeholder={getLocale('binanceWidgetBuyDefault')}
              value={initialAmount}
              onChange={this.setInitialAmount}
            />
            <FiatDropdown
              disabled={isUS}
              itemsShowing={fiatShowing}
              onClick={this.handleFiatChange}
            >
              <span>
                {initialFiat}
              </span>
              <CaratDropdown hide={isUS}>
                <CaratDownIcon />
              </CaratDropdown>
            </FiatDropdown>
            {
              fiatShowing
              ? <AssetItems isFiat={true}>
                  {this.fiatList.map((fiat: string, i: number) => {
                    if (fiat === initialFiat) {
                      return null
                    }

                    return (
                      <AssetItem
                        key={`choice-${fiat}`}
                        isLast={i === (currencies.length - 1)}
                        onClick={this.setInitialFiat.bind(this, fiat)}
                      >
                        {fiat}
                      </AssetItem>
                    )
                  })}
                </AssetItems>
              : null
            }
          </FiatInputWrapper>
          <AssetDropdown
            itemsShowing={currenciesShowing}
            onClick={this.toggleCurrenciesShowing}
          >
            <AssetDropdownLabel>
              {initialAsset}
            </AssetDropdownLabel>
            <CaratDropdown>
              <CaratDownIcon />
            </CaratDropdown>
          </AssetDropdown>
          {
            currenciesShowing
            ? <AssetItems>
                {currencies.map((asset: string, i: number) => {
                  if (asset === initialAsset) {
                    return null
                  }

                  return (
                    <AssetItem
                      key={`choice-${asset}`}
                      isLast={i === (currencies.length - 1)}
                      onClick={this.setInitialAsset.bind(this, asset)}
                    >
                      {asset}
                    </AssetItem>
                  )
                })}
              </AssetItems>
            : null
          }
        </BuyPromptWrapper>
        <ActionsWrapper>
          <ConnectButton onClick={onBuyCrypto.bind(this, initialAsset, initialAmount, initialFiat)}>
            {`${getLocale('binanceWidgetBuy')} ${initialAsset}`}
          </ConnectButton>
        </ActionsWrapper>
      </>
    )
  }

  render () {
    if (!this.props.showContent) {
      return this.renderTitleTab()
    }

    return (
      <WidgetWrapper>
        {this.renderTitle()}
        {this.renderBuyView()}
      </WidgetWrapper>
    )
  }
}
