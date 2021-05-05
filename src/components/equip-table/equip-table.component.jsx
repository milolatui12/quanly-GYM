import React, { useState, useEffect } from 'react';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import "ka-table/style.css";

const EquipTable = ({ equips }) => {
  const dataArray = equips.map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.name,
      batch: x,
      supplier: x,
      status: x,
      id: index,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'name', title: 'TÊN', dataType: DataType.String, style: {width: 150} },
      { key: 'batch', title: 'HẠN BẢO HÀNH', dataType: DataType.String, style: {width: 150} },
      { key: 'supplier', title: 'NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 200} },
      { key: 'status', title: 'TÌNH TRẠNG', dataType: DataType.String, style: {width: 200} },
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
      {...tableProps} 
      dispatch={dispatch}
    />
  );
};


export default EquipTable;