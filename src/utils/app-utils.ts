
import { find, get, isNumber } from 'lodash'
import FastImage from 'react-native-fast-image'

import { log } from '../common/config/log'

export const getImgSource = (uri: string | number) => {
  return isNumber(uri) ? uri : { uri,  priority: FastImage.priority.high }
}

export const capitalizeFirstChar = (str: string) => {
  if(!str) return str
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
}

export const getBlob = (fileUri: string) => {
  return fetch(fileUri).then(
    response => {
      return response.blob()
    },
    error => {
      log(`Error in converting image to blob - ${error}`)
    },
  )
}

export const blobToBase64 = blob => {
  try {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  } catch (err) {
    log(`Error in converting blob to base64 - ${err}`)
    throw err
  }
}

export const getProductType = (productType: number) => {
  if(productType === 1) return 'New'
  return 'Old'
}

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const getFormattedDate = (date) => {
  if (!date) return ''
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = months[newDate.getMonth()]
  const year = newDate.getFullYear()

  return `${day} ${month} ${year}`
}

export const getDateInMDDYYYYFormat = (date) => {
  if (!date) return ''
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = months[newDate.getMonth()]
  const year = newDate.getFullYear()

  return `${month} ${day}, ${year}`
}

export const getProductIdFromPayload = (requestData) => {
  const productObj = find(get(requestData, 'body._parts'), (bodyPart) => bodyPart?.[0] === 'product_id')
  return productObj?.[1]
}

