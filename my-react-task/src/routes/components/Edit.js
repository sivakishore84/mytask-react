import React, { useState } from 'react';
import { Modal, Input } from 'antd'

const style = {
    marginTop: '10px',
    marginBottom: '10px',
}

const Edit = (props) => {
    const {
        selectedRecord,
        editModal,
        onCancel,
        submit,
    } = props
    console.log(props);
    const [name, setName] = useState(selectedRecord && selectedRecord.name);
    const [email, setEmail] = useState(selectedRecord && selectedRecord.email);
    const [validForm, setValidForm] = useState(true);

    const handleOk = () => {
        if (name && email) {
            setValidForm(true);
            submit(
                {
                    id: selectedRecord && selectedRecord.id,
                    name,
                    email,
                })
        }
        else {
            setValidForm(false);
        }
    }

    return (
        <Modal
            title='Edit User'
            open={editModal}
            onCancel={onCancel}
            onOk={handleOk}
            okText="Update"
        >
            <>
                <div style={style}>
                    <strong>User Name</strong>
                </div>
                <div style={style}>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={style}>
                    <strong>Email</strong>
                </div>
                <div style={style}>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    {
                        !validForm && (
                            <p style={{ color: 'red', fontSize: '24px' }}>Please enter valid details</p>
                        )
                    }
                </div>
            </>
        </Modal>

    )
}

export default Edit;