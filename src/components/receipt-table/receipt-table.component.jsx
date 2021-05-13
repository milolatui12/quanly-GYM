import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { deleteReceipt } from '../../redux/receipt/receipt.actions';

import { search } from 'ka-table/actionCreators';
import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import "ka-table/style.css";


const handleDel = async (rcp_code, delReceipt, accountId) => {
  try {
    const response = await axios.post('http://localhost:3030/delete-receipt', {
      rcp_code: rcp_code,
      accountId: accountId
    })
    if(response.status == 200) {
      delReceipt(rcp_code)
    }
  } catch (error) {
    alert("Không xóa được hóa đơn");
  }
}

const EditButton = ({ rowData, history, match }) => {
  return (
   <div className='edit-cell-button'>
     <img
      src='https://komarovalexander.github.io/ka-table/static/icons/edit.svg'
      alt='Edit Row'
      title='Edit Row'
      onClick={() => history.push(`${match.url}/${rowData.id}`)}
    />
   </div>
  );
};
const DeleteButton = ({ rowData, delReceipt, user }) => {
  return (
   <div className='edit-cell-button'>
     <img
      src='https://komarovalexander.github.io/ka-table/static/icons/delete.svg'
      alt='Delete Row'
      title='Delete Row'
      onClick={() => handleDel(rowData.rcp_code, delReceipt, user.id)}
    />
   </div>
  );
};

const ReceiptTable = ({ receipts, history, match, delReceipt, user }) => {
  const dataArray = receipts.map(
    (x, index) => ({
      column1: `${index + 1}`,
      rcp_code: x.rcp_code,
      column3: x.rcp_date,
      column4: x.name,
      column5: x.total,
      id: x.id,
    })
  );

  // initial value of the *props
  const tablePropsInit = {
    columns: [
      { key: 'column1', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'rcp_code', title: 'MÃ PHIẾU', dataType: DataType.String, style: {width: 150} },
      { key: 'column3', title: 'NGÀY NHẬP', dataType: DataType.Date, style: {width: 100} },
      { key: 'column4', title: 'NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 300} },
      { key: 'column5', title: 'TỔNG TIỀN', dataType: DataType.String, style: {width: 200} },
      { key: 'editColumn', title: '',  style: {width: 50, cursor: "pointer"}},
      { key: 'deleteColumn', title: '',  style: {width: 50, cursor: "pointer"}},
    ],
    loading: {
      enabled: false
    },
    paging: {
      enabled: true,
      pageIndex: 0,
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
  }, [receipts])
  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  }
  return (
    <div>
      <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='top-element' placeholder="tìm kiếm"/>
      <Table
        {...tableProps}
        childComponents={{
          cellText: {
            content: (props) => {
              if (props.column.key === 'editColumn'){
                return <EditButton {...props} history={history} match={match} />
              }
              if (props.column.key === 'deleteColumn'){
                return <DeleteButton {...props} delReceipt={delReceipt} user={user} />
              }
            }
          },
          noDataRow: {
            content: () => 'No Data Found'
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
  delReceipt: id => dispatch(deleteReceipt(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReceiptTable));