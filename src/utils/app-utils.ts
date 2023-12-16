
import { find, get, isNumber } from 'lodash'
import { Alert } from 'react-native'
import FastImage from 'react-native-fast-image'

import { BASE_URL } from '../common/ApiConstant'
import { log } from '../common/config/log'
import { OrderReceivedTypeList, PART_REQUEST_STATUS, PART_REQUEST_TYPE } from '../common/Constant'
import { SOMETHING_WENT_WRONG } from '../common/ErrorMessages'
import { showAndroidToastMessage } from '../common/Toast'

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

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']


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

export const isDateCurrentDate = (date) => {
  return getDateInMDDYYYYFormat(date) === getDateInMDDYYYYFormat(new Date())
}

export const isDatePreviousDate = (date) => {
  const currentDate = new Date()
  return getDateInMDDYYYYFormat(date) === getDateInMDDYYYYFormat(new Date().setDate(currentDate.getDate() - 1))
}

export const isDateGreaterThanPreviousWeek = (date) => {
  const currentDate = new Date()
  return getDateInMDDYYYYFormat(date) >= getDateInMDDYYYYFormat(new Date().setDate(currentDate.getDate() - 7))
}
export const getLocalDateTime = (dateObj) => {
  const date = new Date(dateObj)
  const dateHrs = date.getHours()
  let hours: any = dateHrs > 12 ? dateHrs % 12 : dateHrs
  if (hours < 10) hours = `0${hours}`
  if (hours === 0) hours = '12'
  let minutes: any = date.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`
  const timeOfDay = date.getHours() < 12 ? 'AM' : 'PM'
  return `${hours}:${minutes} ${timeOfDay}`
}

export const getDay = (date) => {
  const currentDate = new Date(date)
  const day = currentDate.getDay()
  return days[day]
}

export const getFormattedDateInDetailFormat = (date) => {
  if (!date) return ''
  if(isDateCurrentDate(date)) {
    return `Today at ${getLocalDateTime(date)}`
  }
  if(isDatePreviousDate(date)) {
    return `Yesterday at ${getLocalDateTime(date)}`
  }
  if(isDateGreaterThanPreviousWeek(date)) {
    return `Last ${getDay(date)} at ${getLocalDateTime(date)}`
  }
  return `${getDateInMDDYYYYFormat(date)} at ${getLocalDateTime(date)}`
}

export const getProductIdFromPayload = (requestData) => {
  const productObj = find(get(requestData, 'body._parts'), (bodyPart) => bodyPart?.[0] === 'product_id')
  return productObj?.[1]
}

export const callPromisesParallel = async (promisesArray) => {
  const rejectionHandler = (promiseRes) => {
    return promiseRes
      .then((res) => {
        return res
      })
      .catch((err) => {
        return { error: err }
      })
  }

  return await Promise.all(promisesArray.map(rejectionHandler))
}

export const getTitleWithSeperator = (title, seperator) => {
  let displayTitle = title?.toString()
  if(displayTitle?.length) {
    return `${displayTitle}${seperator}`
  }
  return ''
}

export const isPartRequestCancelled = (requestStatus) => {
  return PART_REQUEST_STATUS[requestStatus] === PART_REQUEST_TYPE.CANCELLED
}

export const isPartRequestResolved = (requestStatus) => {
  return PART_REQUEST_STATUS[requestStatus] === PART_REQUEST_TYPE.RESOLVED
}

export const isPartRequestActive = (requestStatus) => {
  return PART_REQUEST_STATUS[requestStatus] === PART_REQUEST_TYPE.ACTIVE
}

export const getOrderStatusLabel = (orderStatus) => {
  return find(OrderReceivedTypeList, (orderStatusType) => orderStatusType.key === orderStatus)?.label || ''
}

export const handleApiFailure = (payload) => {
  const { error } = payload || {}
  showAndroidToastMessage(get(error, 'message', SOMETHING_WENT_WRONG))
}

export const getSellerProductImagesUrl = (id) => {
  return `${BASE_URL}imagecache/thumb/uploads__productslides/400x400/${id}`
}

export const getBase64FromImageUrl = async (url: string) => {
  const data = await fetch(url)
  const blob = await data.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const base64data = reader.result
      resolve(base64data)
    }
    reader.onerror = reject
  })
}

export const showAlert = (title, heading, onPress, btnTitle) => {
  Alert.alert(title, heading, [
    {
      text: 'Cancel'

    },
    {
      text: btnTitle,
      onPress: () => {
        onPress()
      }
    }
  ],
  {
    cancelable: true
  }
  )
}

export const getImagesArray = (images: string) => {
  if(images?.length) {
    return images.split(',')
  }
}