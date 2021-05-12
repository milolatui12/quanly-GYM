import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';


import "ka-table/style.css";

const RecordTable = ({ records }) => {
  const dataArray = records.map(
    (x, index) => ({
      order: `${index + 1}`,
      staffName: x.staff_name,
      staffId: x.staff_id,
      act: x.act,
      date: x.record_date.slice(0, 19).replace(/T/gi, " "),
      id: x.id,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'staffName', title: 'TÊN NHÂN VIÊN', dataType: DataType.String, style: {width: 200} },
      { key: 'staffId', title: 'MÃ NHÂN VIÊN', dataType: DataType.String, style: {width: 150} },
      { key: 'act', title: 'HÀNH ĐỘNG', dataType: DataType.String, style: {width: 150} },
      { key: 'date', title: 'NGÀY', dataType: DataType.String, style: {width: 200} }
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
  }, [records])
  const dispatch = action => {
    changeTableProps(prevState => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
    />
  );
};

const mapStateToProps =({ user }) => ({
  user: user.currentUser
})

export default withRouter(connect(mapStateToProps)(RecordTable));