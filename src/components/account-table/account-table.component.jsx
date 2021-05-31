import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { search } from 'ka-table/actionCreators';
import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import { Button } from 'semantic-ui-react'

import { deleteSupplier } from '../../redux/supplier/supplier.actions';
import { BiReset } from 'react-icons/bi';

import "ka-table/style.css";

const bootstrapChildComponents = {
  table: {
    elementAttributes: () => ({
      className: 'table table-striped table-hover table-bordered'
    })
  },
  tableHead: {
    elementAttributes: () => ({
      className: 'thead-dark'
    })
  },
  pagingIndex: {
    elementAttributes: ({ isActive }) => ({
      className: `page-item ${(isActive ? 'active' : '')}`
    }),
    content: ({ text }) => <div className='page-link'>{text}</div>
  },
  pagingPages: {
    elementAttributes: () => ({
      className: 'pagination'
    }),
  }
}

const handleReset = async (rowData, user) => {
  try {
    await axios.post('http://localhost:3030/reset-password', {
        role: user.rol,
        id: rowData.id,
        accountId: user.id
    })
    alert("Đặt lại thành công")
  } catch (error) {
      alert(error);
  }
}

const ResetButton = ({ rowData, user }) => {
  return (
   <div className='edit-cell-button'>
     <BiReset
      alt='Reset password'
      title='Reset password'
      onClick={() => handleReset(rowData, user)}
    />
   </div>
  );
};
const ActiveButton = ({ rowData }) => {
  return (
    <Button toggle active={rowData.active}>
      {rowData.active? "đang hđ": "không hđ"}
    </Button>
  );
};

const AccountTable = ({ accounts, history, match, user }) => {
  const dataArray = accounts.map(
    (x, index) => ({
      order: `${index + 1}`,
      username: x.username,
      idCode: x.id_code,
      name: `${x.last_name}  ${x.first_name}`,
      birthDate: x.birth_date,
      role: x.rol,
      active: x.active,
      id: x.id,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'username', title: 'TÊN ĐĂNG NHẬP', dataType: DataType.String, style: {width: 200} },
      { key: 'idCode', title: 'CMND', dataType: DataType.String, style: {width: 200} },
      { key: 'name', title: 'TÊN NHÂN VIÊN', dataType: DataType.String, style: {width: 250} },
      { key: 'birthDate', title: 'NGÀY SINH', dataType: DataType.Date, style: {width: 200} },
      { key: 'role', title: 'QUYỀN', dataType: DataType.String, style: {width: 100} },
      { key: 'resetColumn', title: '',  style: {width: 50, cursor: "pointer"}},
      { key: 'activeColumn', title: '',  style: {width: 90, cursor: "pointer"}},
    ],
    loading: {
      enabled: false
    },
    paging: {
      enabled: true,
      pageSize: 10, 
      position: PagingPosition.Bottom
    },
    format: ({ column, value }) => {
        if (column.dataType === DataType.Date){
          return value && value.toLocaleDateString('en-GB', {month: '2-digit', day: '2-digit', year: 'numeric' });
        }
    },
    data: dataArray,
    editingMode: EditingMode.None,
    rowKeyField: 'id',
    singleAction: loadData(),
    sortingMode: SortingMode.None,
  };
  
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  useEffect(() => {
    changeTableProps({
      ...tableProps,
      data: dataArray,
      loading: true
    })   
  }, [accounts])
  const dispatch = action => {
    changeTableProps(prevState => kaReducer(prevState, action));
  };

  return (
    <div>
      <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='search' placeholder="tìm kiếm" style={{ marginBottom: 10}}/>
      <Table
        {...tableProps}
        childComponents={{
          ...bootstrapChildComponents,
          cellText: {
            content: (props) => {
              if (props.column.key === 'resetColumn'){
                return <ResetButton {...props} user={user}/>
              }
              if (props.column.key === 'activeColumn'){
                return <ActiveButton {...props}/>
              }
            }
          },
          noDataRow: {
            content: () => 'No Data Found'
          },
          tableWrapper: {
            elementAttributes: () => ({ style: { maxHeight: 500, maxWidth: 5000 }})
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

const mapStateToProps =({ user }) => ({
  user: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  delSupplier: id => dispatch(deleteSupplier(id))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountTable));