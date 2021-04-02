import React, { useState, useEffect } from 'react';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import {
  hideLoading, loadData, setSingleAction, showLoading, updateData, updatePagesCount,
} from 'ka-table/actionCreators';

import "ka-table/style.css";

const DeviceTable = ({ devices }) => {
  const dataArray = devices.map(
    (x, index) => ({
      column1: `${index + 1}`,
      column2: x.name,
      column3: x.name,
      column4: x.batch,
      column5: x.warrantyPeriod,
      column6: x.unit,
      column7: x.quantity,
      column8: x.price,
      column9: x.quantity*x.price,
      id: index,
    })
  );

  // initial value of the *props
  const tablePropsInit = {
    columns: [
      { key: 'column1', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'column2', title: 'MÃ TB', dataType: DataType.String, style: {width: 70} },
      { key: 'column3', title: 'TÊN TB', dataType: DataType.String, style: {width: 200} },
      { key: 'column4', title: 'LÔ HÀNG', dataType: DataType.String, style: {width: 100} },
      { key: 'column5', title: 'HẠN BH', dataType: DataType.String, style: {width: 100} },
      { key: 'column6', title: 'ĐVT', dataType: DataType.String, style: {width: 50} },
      { key: 'column7', title: 'SỐ LƯỢNG', dataType: DataType.String, style: {width: 100} },
      { key: 'column8', title: 'ĐƠN GIÁ', dataType: DataType.Number, style: {width: 100} },
      { key: 'column9', title: 'THÀNH TIỀN', dataType: DataType.Number, style: {width: 100} }
    ],
    loading: {
      enabled: false
    },
    paging: {
      enabled: true,
      pageIndex: 0,
      pageSize: 5, 
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
  }, [devices])
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


export default DeviceTable;