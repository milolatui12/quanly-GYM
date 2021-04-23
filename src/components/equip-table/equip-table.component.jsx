import React, { useState, useEffect } from 'react';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import {
  hideLoading, loadData, setSingleAction, showLoading, updateData, updatePagesCount,
} from 'ka-table/actionCreators';

import "ka-table/style.css";

const EquipTable = ({ equips }) => {
  const dataArray = equips.map(
    (x, index) => ({
      column1: `${index + 1}`,
      column2: x.rcpCode,
      column3: x.date,
      column4: x.supplier.TEN_NCC,
      column5: x.total,
      column6: 'edit',
      id: index,
    })
  );

  // initial value of the *props
  const tablePropsInit = {
    columns: [
      { key: 'column1', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'column2', title: 'MÃ PHIẾU', dataType: DataType.String, style: {width: 150} },
      { key: 'column3', title: 'NGÀY NHẬP', dataType: DataType.String, style: {width: 100} },
      { key: 'column4', title: 'NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 300} },
      { key: 'column5', title: 'TỔNG TIỀN', dataType: DataType.String, style: {width: 200} },
      { key: 'column6', title: '', dataType: DataType.String, style: {width: 50} },
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
  }, [equips])
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


export default EquipTable;