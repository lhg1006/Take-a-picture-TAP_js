import React, {ReactNode} from 'react'
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/common/common.css'

type CustomConfirmProps = {
  title?: ReactNode
  message?: ReactNode
  onConfirm?: Function
}

export const CustomConfirm = ({title="Are you sure?", message="", onConfirm = ()=>{}} : CustomConfirmProps) => {
  confirmAlert({
    customUI: ({onClose}) => {
      return (
        <div className='custom-ui'>
          <h1 className={'fs20'}>{title}</h1>
          <p>{message}</p>
          <button className={'pink_btn'} onClick={onClose}>No</button>
          <button className={'pink_btn'}
                  onClick={()=>{
                    onClose()
                    onConfirm()
                  }}
          >
            Yes
          </button>
        </div>
      );
    }
  });
}