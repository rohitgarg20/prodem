import React, { PureComponent } from 'react'

import { isNumber } from 'lodash'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { LoadingImageComponent } from './LoadingImageComponent'
import { getImgSource } from '../../../utils/app-utils'
import { colors } from '../../Colors'
import { icons } from '../../Icons'
import { IconWrapperComponent } from '../../Interfaces'

const styles = StyleSheet.create({
  imageLoading: {
    position: 'absolute'
  },
  loadingContainer: {
    backgroundColor: colors.aquaHaze,
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  }
})


interface IState {
  showLoader: boolean
}


export class IconWrapper extends PureComponent<IconWrapperComponent, IState> {

  constructor(props: IconWrapperComponent, state) {
    super(props, state)
    const isImgSrcUri = !isNumber(props.iconSource)
    this.state = {
      showLoader: isImgSrcUri
    }
  }

  shouldComponentUpdate(nextProps: Readonly<IconWrapperComponent>, nextState: Readonly<IState>): boolean {
    if(nextProps === this.props && this.state.showLoader === nextState.showLoader) {
      return false
    }
    return true
  }


  getContainerStyle = ({
    iconWidth: iconW, iconHeight: iconH, containerStyle
  }: { iconWidth: number | string; iconHeight: number | string; containerStyle: any  }) => {
    return {
      ...containerStyle,
      height: iconH,
      width: iconW
    }
  }

  updateImageLoadingStatus = (status) => {
    this.setState({
      showLoader: status
    })
  }


  onImageLoadEnd = () => {
    this.updateImageLoadingStatus(false)
  }

  getImageSource = () => {
    const { iconSource } = this.props
    return getImgSource(iconSource)
  }

  renderImageLoadingComponent = () => {
    const { showLoader } = this.state
    const { iconHeight, iconWidth } = this.props

    if(!showLoader) return null
    return (
      <LoadingImageComponent
        iconHeight={iconHeight}
        iconWidth={iconWidth}
      />
    )
  }


  render() {
    const { showLoader } = this.state
    const { iconHeight, iconWidth, resizeMode, iconSource, style, ...restProps } = this.props
    const isImgSrcUri = !isNumber(iconSource)


    if(!isImgSrcUri) {
      <FastImage
        source={getImgSource(iconSource)}
        style = {this.getContainerStyle({
          iconHeight,
          iconWidth,
          containerStyle: style
        })}
        resizeMode={resizeMode || 'contain'}
        defaultSource={icons.DEFAULT_IMAGE}
        { ...restProps }
      />
    }

    return (
      <>
        <FastImage
          source={this.getImageSource()}
          style = {this.getContainerStyle({
            iconHeight,
            iconWidth,
            containerStyle: style
          })}
          onLoadEnd={this.onImageLoadEnd}
          resizeMode={resizeMode || 'contain'}
          onError={this.onImageLoadEnd}
          onLoad={(data) => {
            // log('on end is called', data)
          }}
          onLoadStart={() => {
            // log('on onLoadStart is called')
          }}
          defaultSource={icons.DEFAULT_IMAGE}
          { ...restProps }
        >
          {
            showLoader && <View style={styles.loadingContainer}>
              <ActivityIndicator size={'large'}
                animating = {true}
                color = {colors.primary} />
            </View>
          }
        </FastImage>

      </>
    )

  }
}