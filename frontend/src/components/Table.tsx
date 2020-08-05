import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchAllUsers } from '../redux/user/thunk';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Button } from 'react-bootstrap';
import { DeleteProductModal } from './DeleteProductModal';

export default function Table() {
    const dispatch = useDispatch();
    const usersData = useSelector((state: RootState) => state.user.users)
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [DeleteFormData, setDeleteFormData] = useState({productCode:null, productName:null} as any);
    const users = []
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch])
    for (const userId in usersData) {
        users.push({
            id: usersData[userId].id,
            firstName: usersData[userId].firstName,
            lastName: usersData[userId].lastName,
            email: usersData[userId].email,
            title: usersData[userId].title,
            picture: usersData[userId].picture,
        })
    }

    const deleteFormatter = (cell: any, row: any, rowIndex: number, formatExtraData: any) => {
        return <Button
            variant="info"
            onClick={() => {
                setDeleteFormData(row.id);
                setShowDeleteForm(true);
            }}
        >
            Delete
      </Button>
    }


    const iconFormatter = (cell: any, row: any, rowIndex: number, formatExtraData: any) => {
        return <img src={row.picture} alt="icon"/>
    }

    const { SearchBar } = Search;
    const columns = [{
        dataField: 'id',
        text: 'id',
        sort: false
    }, {
        dataField: 'icon',
        text: 'Icon',
        formatter: iconFormatter,
        sort: false
    },{
        dataField: 'title',
        text: 'Title',
        sort: true
    }, {
        dataField: 'firstName',
        text: 'First Name',
        sort: true
    }, {
        dataField: 'lastName',
        text: 'Last Name',
        sort: true
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true
    },{
        dataField: "delete",
        text: "Delete",
        formatter: deleteFormatter,
        sort: false
    }];

    return (
        <>
        <ToolkitProvider
            bootstrap4
            search
            keyField='id'
            data={users}
            columns={columns}
            
            >
        {(props) => (
                <div>
                    <h3>Input to search:</h3>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable
                        {...props.baseProps}
                        hover
                        rowStyle={ { wordBreak: 'break-all' }}
                        pagination={paginationFactory({})} 
                    />
                </div>
            )}
        </ToolkitProvider >
        <DeleteProductModal showModal={showDeleteForm} setCloseModal={()=>setShowDeleteForm(false)} userId={DeleteFormData}/>
        </>
    )
}
