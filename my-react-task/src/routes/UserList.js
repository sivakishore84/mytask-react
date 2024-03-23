import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUserDetails } from '../store/userSlice';
import { Table } from 'antd';
import Delete from './components/Delete';
import Edit from './components/Edit';

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteModal = (record) => {
        setDeleteModal(true);
        setSelectedRecord(record);
    }

    const handleCancel = () => {
        setDeleteModal(false);
        setEditModal(false);
    }

    const handleEditeModal = (record) => {
        setEditModal(true);
        setSelectedRecord(record);
    }

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
        setDeleteModal(false);
    };

    const handleUpdate = (info: Object) => {
        const {
            id,
            name,
            email,
        } = info;
        dispatch(updateUserDetails({id, name, email}));
        setEditModal(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const userColumns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Company',
        key: 'company',
        render: (text, record) => (
            <span>
                {(record && record.company && record.company.name) || '-'}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <div style={{ display: 'flex' }}>
                <div
                    style={{ marginRight: '10px' }}
                    onClick={() => handleDeleteModal(record)}
                >
                    <a href="#">Delete</a>
                </div>
                <div
                    onClick={() => handleEditeModal(record)}
                >
                    <span className="ant-divider" />
                    <a href="#">
                        Edit
                    </a>
                </div>
            </div>
        ),
    }
    ];

    return (
        <div>
            <h1>User List</h1>
            <Table
                dataSource={users}
                columns={userColumns}
                pagination={false}
            />
            {
                deleteModal && (
                    <Delete
                        selectedRecord={selectedRecord}
                        deleteModal={deleteModal}
                        submit={handleDelete}
                        onCancel={handleCancel}
                    />
                )
            }
            {
                editModal && (
                    <Edit
                        selectedRecord={selectedRecord}
                        editModal={editModal}
                        submit={handleUpdate}
                        onCancel={handleCancel}
                    />
                )
            }
        </div>
    );
}

export default UserList;