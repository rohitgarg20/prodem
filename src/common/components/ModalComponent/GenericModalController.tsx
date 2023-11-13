import { createRef } from 'react'
import { isIos } from '../../Constant'

class GenericDrawerController {
  renderingComponent: any = undefined
  closeDrawerOnOutsideTouch = false
  modalPositionStyling = {}
  modalRef: any = createRef()
  closeModalHandler: any = undefined
  onCloseModalCallback: any = undefined

  setModalRef = (modalRef) => {
    this.modalRef = modalRef
  }

  showGenericDrawerModal = ({
    renderingComponent,
    closeDrawerOnOutsideTouch = isIos,
    closeModal = this.closeGenericDrawerModal,
    modalPositionStyling = {},
    onCloseModalCallback = () => {}
  }) => {

    this.renderingComponent = renderingComponent
    this.closeDrawerOnOutsideTouch = closeDrawerOnOutsideTouch
    this.closeModalHandler = closeModal
    this.modalPositionStyling = modalPositionStyling
    this.onCloseModalCallback =  onCloseModalCallback
  }

  openGenericDrawerModal = () => {
    if(this.modalRef?.current) {
      this.modalRef.current?.closeDrawer()
      this.modalRef.current.showDrawer()
    }
  }

  updateModalPositionStyling = (style) => {
    this.modalPositionStyling = { ...style }
  }

  closeGenericDrawerModal = () => {
    this.modalRef.current?.closeDrawer()
    this.modalPositionStyling = {}
  }


}

export const genericDrawerController = new GenericDrawerController()