/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {
  Page,
  Header,
  ClockWidget as Clock,
  ListWidget as List,
  Footer,
  App,
  PosterBackground,
  Gradient,
  RewardsWidget as Rewards,
  BinanceWidget as Binance
} from '../../components/default'

// Components
import Stats from './stats'
import Block from './block'
import FooterInfo from './footerInfo'
import SiteRemovalNotification from './notification'

interface Props {
  newTabData: NewTab.State
  actions: any
  saveShowBackgroundImage: (value: boolean) => void
  saveShowClock: (value: boolean) => void
  saveShowTopSites: (value: boolean) => void
  saveShowStats: (value: boolean) => void
  saveShowRewards: (value: boolean) => void
  saveShowBinance: (value: boolean) => void
}

interface State {
  onlyAnonWallet: boolean
  showSettingsMenu: boolean
  backgroundHasLoaded: boolean
}

class NewTabPage extends React.Component<Props, State> {
  state = {
    onlyAnonWallet: false,
    showSettingsMenu: false,
    backgroundHasLoaded: false
  }

  componentDidMount () {
    // if a notification is open at component mounting time, close it
    this.props.actions.onHideSiteRemovalNotification()
    this.trackCachedImage()
  }

  componentDidUpdate (prevProps: Props) {
    if (!prevProps.newTabData.showBackgroundImage &&
          this.props.newTabData.showBackgroundImage) {
      this.trackCachedImage()
    }
    if (prevProps.newTabData.showBackgroundImage &&
      !this.props.newTabData.showBackgroundImage) {
      // reset loaded state
      this.setState({ backgroundHasLoaded: false })
    }
  }

  trackCachedImage () {
    if (this.props.newTabData.showBackgroundImage &&
        this.props.newTabData.backgroundImage &&
        this.props.newTabData.backgroundImage.source) {
      const imgCache = new Image()
      imgCache.src = this.props.newTabData.backgroundImage.source
      console.timeStamp('image start loading...')
      imgCache.onload = () => {
        console.timeStamp('image loaded')
        this.setState({
          backgroundHasLoaded: true
        })
      }
    }
  }

  onDraggedSite = (fromUrl: string, toUrl: string, dragRight: boolean) => {
    this.props.actions.siteDragged(fromUrl, toUrl, dragRight)
  }

  onDragEnd = (url: string, didDrop: boolean) => {
    this.props.actions.siteDragEnd(url, didDrop)
  }

  onToggleBookmark (site: NewTab.Site) {
    if (site.bookmarked === undefined) {
      this.props.actions.bookmarkAdded(site.url)
    } else {
      this.props.actions.bookmarkRemoved(site.url)
    }
  }

  onTogglePinnedTopSite (site: NewTab.Site) {
    if (!site.pinned) {
      this.props.actions.sitePinned(site.url)
    } else {
      this.props.actions.siteUnpinned(site.url)
    }
  }

  onIgnoredTopSite (site: NewTab.Site) {
    this.props.actions.siteIgnored(site.url)
  }

  toggleShowBackgroundImage = () => {
    this.props.saveShowBackgroundImage(
      !this.props.newTabData.showBackgroundImage
    )
  }

  toggleShowClock = () => {
    this.props.saveShowClock(
      !this.props.newTabData.showClock
    )
  }

  toggleShowStats = () => {
    this.props.saveShowStats(
      !this.props.newTabData.showStats
    )
  }

  toggleShowTopSites = () => {
    this.props.saveShowTopSites(
      !this.props.newTabData.showTopSites
    )
  }

  toggleShowRewards = () => {
    this.props.saveShowRewards(
      !this.props.newTabData.showRewards
    )
  }

  toggleShowBinance = () => {
    this.props.saveShowBinance(
      !this.props.newTabData.showBinance
    )
  }

  connectBinance = () => {
    this.props.actions.connectToBinance()
  }

  onApiKeysInvalid = () => {
    this.props.actions.onApiKeysInvalid()
  }

  setApiKeys = (apiKey: string, apiSecret: string) => {
    this.props.actions.setApiKeys(apiKey, apiSecret)
    setTimeout(() => {
      chrome.binance.validateAPIKey((status: number, unauthorized: boolean) => {
        if (unauthorized || (status < 200 || status > 299)) {
          this.props.actions.onApiCredsError()
        } else {
          this.props.actions.onValidApiCreds()
        }
      })
    }, 1000)
  }

  setBinanceBalances = (balances: Record<string, string>) => {
    this.props.actions.onBinanceBalances(balances)
  }

  setBTCUSDPrice = (price: string) => {
    this.props.actions.onBTCUSDPrice(price)
  }

  setAssetBTCPrice = (ticker: string, price: string) => {
    this.props.actions.onAssetBTCPrice(ticker, price)
  }

  onBinanceUserTLD = (userTLD: NewTab.BinanceTLD) => {
    this.props.actions.onBinanceUserTLD(userTLD)
  }

  openBinanceUrl = (route: string) => {
    let path = ''
    const { userTLD } = this.props.newTabData.binanceState

    switch (route) {
      case 'deposit':
        path = '/usercenter/wallet/deposit/BTC'
        break
      case 'trade':
        path = '/usercenter/wallet/balances'
        break
      case 'details':
        path = '/usercenter/dashboard/overview'
        break
      case 'newKey':
        path = '/usercenter/settings/api-management '
        break
    }

    window.open(`https://www.binance.${userTLD}/en${path}`, '_blank')
  }

  depositBinance = () => {
    this.openBinanceUrl('deposit')
  }

  tradeBinance = () => {
    this.openBinanceUrl('trade')
  }

  binanceDetails = () => {
    this.openBinanceUrl('details')
  }

  generateNewKey = () => {
    this.openBinanceUrl('newKey')
  }

  setHideBalance = (hide: boolean) => {
    this.props.actions.setHideBalance(hide)
  }

  disconnectBinance = () => {
    this.props.actions.disconnectBinance()
  }

  enableAds = () => {
    chrome.braveRewards.saveAdsSetting('adsEnabled', 'true')
  }

  enableRewards = () => {
    this.props.actions.onRewardsSettingSave('enabledMain', '1')
  }

  createWallet = () => {
    this.props.actions.createWallet()
  }

  dismissNotification = (id: string) => {
    this.props.actions.dismissNotification(id)
  }

  closeSettings = () => {
    this.setState({ showSettingsMenu: false })
  }

  toggleSettings = () => {
    this.setState({ showSettingsMenu: !this.state.showSettingsMenu })
  }

  render () {
    const { newTabData, actions } = this.props
    const { showSettingsMenu } = this.state
    const { rewardsState, binanceState } = newTabData

    if (!newTabData) {
      return null
    }

    return (
      <App dataIsReady={newTabData.initialDataLoaded}>
        <PosterBackground
          hasImage={newTabData.showBackgroundImage}
          imageHasLoaded={this.state.backgroundHasLoaded}
        >
          {newTabData.showBackgroundImage && newTabData.backgroundImage &&
            <img src={newTabData.backgroundImage.source} />
          }
        </PosterBackground>
        {newTabData.showBackgroundImage &&
          <Gradient
            imageHasLoaded={this.state.backgroundHasLoaded}
          />
        }
        <Page>
          <Header>
            <Stats
              textDirection={newTabData.textDirection}
              stats={newTabData.stats}
              showWidget={newTabData.showStats}
              hideWidget={this.toggleShowStats}
              menuPosition={'right'}
            />
            <Clock
              textDirection={newTabData.textDirection}
              showWidget={newTabData.showClock}
              hideWidget={this.toggleShowClock}
              menuPosition={'left'}
            />
            <Rewards
              {...rewardsState}
              onCreateWallet={this.createWallet}
              onEnableAds={this.enableAds}
              onEnableRewards={this.enableRewards}
              textDirection={newTabData.textDirection}
              showWidget={newTabData.showRewards}
              hideWidget={this.toggleShowRewards}
              onDismissNotification={this.dismissNotification}
              menuPosition={'left'}
            />
            <Binance
              {...binanceState}
              menuPosition={'left'}
              showWidget={newTabData.showBinance}
              hideWidget={this.toggleShowBinance}
              connectBinance={this.connectBinance}
              onBinanceDetails={this.binanceDetails}
              onBinanceDeposit={this.depositBinance}
              onBinanceTrade={this.tradeBinance}
              onSetHideBalance={this.setHideBalance}
              onGenerateNewKey={this.generateNewKey}
              onBinanceBalances={this.setBinanceBalances}
              onBinanceUserTLD={this.onBinanceUserTLD}
              onBTCUSDPrice={this.setBTCUSDPrice}
              onSetApiKeys={this.setApiKeys}
              onApiKeysInvalid={this.onApiKeysInvalid}
              onAssetBTCPrice={this.setAssetBTCPrice}
              onDisconnectBinance={this.disconnectBinance}
              textDirection={newTabData.textDirection}
            />
            {this.props.newTabData.gridSites.length ? <List
              blockNumber={this.props.newTabData.gridSites.length}
              textDirection={newTabData.textDirection}
              showWidget={newTabData.showTopSites}
              menuPosition={'right'}
              hideWidget={this.toggleShowTopSites}
            >
              {
                this.props.newTabData.gridSites.map((site: NewTab.Site) =>
                  <Block
                    key={site.url}
                    id={site.url}
                    title={site.title}
                    href={site.url}
                    favicon={site.favicon}
                    style={{ backgroundColor: site.themeColor || site.computedThemeColor }}
                    onToggleBookmark={this.onToggleBookmark.bind(this, site)}
                    onPinnedTopSite={this.onTogglePinnedTopSite.bind(this, site)}
                    onIgnoredTopSite={this.onIgnoredTopSite.bind(this, site)}
                    onDraggedSite={this.onDraggedSite}
                    onDragEnd={this.onDragEnd}
                    isPinned={site.pinned}
                    isBookmarked={site.bookmarked !== undefined}
                  />
                )
              }
            </List> : null}
            {
              this.props.newTabData.showSiteRemovalNotification
              ? <SiteRemovalNotification actions={actions} />
              : null
            }
          </Header>
          <Footer>
            <FooterInfo
              textDirection={newTabData.textDirection}
              onClickOutside={this.closeSettings}
              backgroundImageInfo={newTabData.backgroundImage}
              onClickSettings={this.toggleSettings}
              showSettingsMenu={showSettingsMenu}
              showPhotoInfo={newTabData.showBackgroundImage}
              toggleShowBackgroundImage={this.toggleShowBackgroundImage}
              toggleShowClock={this.toggleShowClock}
              toggleShowStats={this.toggleShowStats}
              toggleShowTopSites={this.toggleShowTopSites}
              showBackgroundImage={newTabData.showBackgroundImage}
              showClock={newTabData.showClock}
              showStats={newTabData.showStats}
              showTopSites={newTabData.showTopSites}
              showRewards={newTabData.showRewards}
              toggleShowRewards={this.toggleShowRewards}
              showBinance={newTabData.showBinance}
              toggleShowBinance={this.toggleShowBinance}
            />
          </Footer>
        </Page>
      </App>
    )
  }
}

export default DragDropContext(HTML5Backend)(NewTabPage)
