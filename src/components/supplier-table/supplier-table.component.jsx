import React, { useState, useEffect } from 'react';

import { Table, kaReducer } from 'ka-table';
import { ActionType, DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import {
  hideLoading, loadData, setSingleAction, showLoading, updateData, updatePagesCount,
} from 'ka-table/actionCreators';

import "ka-table/style.css";

const SupplierTable = ({ suppliers }) => {
  const dataArray = suppliers.map(
    (x, index) => ({
      column1: `${index + 1}`,
      column2: x.name,
      column3: x.taxId,
      column4: x.address,
      column5: 'không có',
      id: index,
    })
  );

  // initial value of the *props
  const tablePropsInit = {
    columns: [
      { key: 'column1', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'column2', title: 'TÊN NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 300} },
      { key: 'column3', title: 'MÃ SỐ THUẾ', dataType: DataType.String, style: {width: 100} },
      { key: 'column4', title: 'ĐỊA CHỈ', dataType: DataType.String, style: {width: 500} },
      { key: 'column5', title: 'THÔNG TIN', dataType: DataType.String, style: {width: 200} },
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
    data: dataArray,
    editingMode: EditingMode.None,
    rowKeyField: 'id',
    singleAction: loadData(),
    sortingMode: SortingMode.None,
  };
  
  // in this case *props are stored in the state of parent component
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  useEffect(() => {
      changeTableProps({
        ...tableProps,
        data: dataArray,
        loading: true
      })   
  }, [suppliers])
  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  }
  return (
    <Table
      {...tableProps} // ka-table UI is rendered according to props
      dispatch={dispatch}
    />
  );
};


export default SupplierTable;