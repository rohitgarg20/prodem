import React from 'react'

import { StyleSheet, View } from 'react-native'

import { ProdemLogoComponent } from './ProdemLogoComponent'
import { SpacerComponent, SubHeadingComponent } from '../../generic'
import { HeadingComponent } from '../HeadingComponent'

const styles = StyleSheet.create({
  subDetailContainer: {
    width: '100%',
    flex: 1
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10
  },
  seperator: {
    paddingTop: 4
  }
})

export const FormTopSectionComponent = ({ subHeading }: { subHeading: string }) => {


  const renderSubDetailsComponent = () => {
    return (
      <View style={styles.subDetailContainer}>
        <HeadingComponent text={ 'CHECK_USER_EXISTANCE_SCREEN.Heading' } />
        <SpacerComponent style={styles.seperator} />
        <SubHeadingComponent text={subHeading} />
      </View>
    )
  }

  return (
    <View style={styles.infoContainer}>
      <ProdemLogoComponent />
      {renderSubDetailsComponent()}
    </View>
  )


}