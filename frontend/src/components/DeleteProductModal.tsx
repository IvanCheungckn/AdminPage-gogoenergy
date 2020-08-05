import React from 'react'
import Modal from 'antd/lib/modal/Modal';
import './Modal.scss'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/user/thunk';
export const DeleteProductModal:React.FC<{showModal: boolean, setCloseModal: ()=>void, userId: string}> = (props) => {
      const dispatch = useDispatch();

      const handleOk = (event: any) => {
        dispatch(deleteUser(props.userId))
        props.setCloseModal();
      };
    
      const handleCancel = (event: any) => {
        props.setCloseModal();

      };

    return (
        <div>
            <Modal
            title="Delete User"
            visible={props.showModal}
            okText="Delete"
            onOk={handleOk}
            onCancel={handleCancel}
            >
                <p>Are you sure to delete the user?</p>
            </Modal>
        </div>
    )
}