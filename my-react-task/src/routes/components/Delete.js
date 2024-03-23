import React, {useState} from "react";
import { Modal } from 'antd';


const Delete = (props) => {
    const {
        selectedRecord,
        submit,
        onCancel,
        deleteModal,
    } = props

    console.log(deleteModal);

    const handleOk = () => {
        submit(selectedRecord && selectedRecord.id)
    }
  

    return (
        <>
        <Modal
        title="Delete"
        open={deleteModal}
         onOk={handleOk}
        onCancel={onCancel}
        okText="Delete"
      >
        <div>Are you sure you want to delete {selectedRecord && selectedRecord.name}?</div>
        </Modal>
        </>
    )
}

export default Delete;