import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Table, kaReducer } from 'ka-table';
import { ActionType, DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import {
  hideLoading, loadData, setSingleAction, showLoading, updateData, updatePagesCount,
} from 'ka-table/actionCreators';

import "ka-table/style.css";

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

const SupplierTable = ({ suppliers, history, match }) => {
  const dataArray = suppliers.map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.name,
      taxId: x.tax_id,
      address: x.address,
      des: 'không có',
      id: x.id,
    })
  );

  // initial value of the *props
  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'name', title: 'TÊN NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 300} },
      { key: 'taxId', title: 'MÃ SỐ THUẾ', dataType: DataType.String, style: {width: 100} },
      { key: 'address', title: 'ĐỊA CHỈ', dataType: DataType.String, style: {width: 300} },
      //{ key: 'des', title: 'THÔNG TIN', dataType: DataType.String, style: {width: 200} },
      { key: 'editColumn', title: '',  style: {width: 50}},
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
  
  // in this case *props are stored in the state of parent component
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch = action => {
    changeTableProps(prevState => kaReducer(prevState, action));
  };
  return (
    <Table
      {...tableProps}
      childComponents={{
        cellText: {
          content: (props) => {
            if (props.column.key === 'editColumn'){
              return <EditButton {...props} history={history} match={match}/>
            }
          }
        }
      }}
      dispatch={dispatch}
    />
  );
};



export default withRouter(SupplierTable);