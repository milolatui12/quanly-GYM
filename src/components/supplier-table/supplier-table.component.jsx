import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { search } from 'ka-table/actionCreators';
import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import { deleteSupplier } from '../../redux/supplier/supplier.actions';

import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';

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

const handleDel = async (id, delSupplier, accountId) => {
  try {
    const response = await axios.post('http://localhost:3030/delete-supplier', {
      id: id,
      accountId: accountId
    })
    if(response.status == 200) {
      delSupplier(id)
    }
  } catch (error) {
    alert(error);
  }
}
const EditButton = ({ rowData, history, match }) => {
  return (
   <div className='edit-cell-button'>
     <RiEdit2Fill
      alt='Edit Row'
      title='Edit Row'
      onClick={() => history.push(`${match.url}/${rowData.id}`)}
      />
   </div>
  );
};
const DeleteButton = ({ rowData, delSupplier, user }) => {
  return (
   <div className='edit-cell-button'>
     <RiDeleteBin2Fill
      alt='Delete Row'
      title='Delete Row'
      onClick={() => handleDel(rowData.id, delSupplier, user.id)}
    />
   </div>
  );
};


const SupplierTable = ({ suppliers, history, match, delSupplier, user }) => {
  const dataArray = suppliers.map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.name,
      taxId: x.tax_id,
      address: x.address,
      des: 'không có',
      passed: true,
      id: x.id,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'name', title: 'TÊN NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 300} },
      { key: 'taxId', title: 'MÃ SỐ THUẾ', dataType: DataType.String, style: {width: 100} },
      { key: 'address', title: 'ĐỊA CHỈ', dataType: DataType.String, style: {width: 300} },
      //{ key: 'des', title: 'THÔNG TIN', dataType: DataType.String, style: {width: 200} },
      { key: 'editColumn', title: '',  style: {width: 50, cursor: "pointer"}},
      { key: 'deleteColumn', title: '',  style: {width: 50, cursor: "pointer"}},
    ],
    loading: {
      enabled: false
    },
    paging: {
      enabled: true,
      pageSize: 10, 
      position: PagingPosition.Bottom
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
  }, [suppliers])
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
              if (props.column.key === 'editColumn'){
                return <EditButton {...props} history={history} match={match}/>
              }
              if (props.column.key === 'deleteColumn'){
                return <DeleteButton {...props} delSupplier={delSupplier} user={user}/>
              }
            }
          },
          noDataRow: {
            content: () => 'No Data Found'
          },
          tableWrapper: {
            elementAttributes: () => ({ style: { maxHeight: 500 }})
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierTable));