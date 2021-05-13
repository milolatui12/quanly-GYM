import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { search } from 'ka-table/actionCreators';
import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';


import "ka-table/style.css";

const RecordStateTable = ({ records }) => {
  const dataArray = records.map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.eg_name,
      state_des: x.state_des,
      des: x.des,
      date: x.state_date.slice(0, 19).replace(/T/gi, " "),
      id: x.id,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'name', title: 'TÊN THIẾT BỊ', dataType: DataType.String, style: {width: 200} },
      { key: 'state_des', title: 'TÌNH TRẠNG', dataType: DataType.String, style: {width: 150} },
      { key: 'des', title: 'MÔ TẢ', dataType: DataType.String, style: {width: 150} },
      { key: 'date', title: 'NGÀY CHỈNH SỬA', dataType: DataType.Date, style: {width: 200} }
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
    format: ({ column, value }) => {
      if (column.dataType === DataType.Date){
        return value && value.toLocaleString('en-GB');
      }
    },
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
    <div>
      <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='top-element form-control' placeholder="tìm kiếm"/>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          noDataRow: {
            content: () => 'No Data Found'
          }
        }}
      />
    </div>
  );
};

const mapStateToProps =({ user }) => ({
  user: user.currentUser
})

export default withRouter(connect(mapStateToProps)(RecordStateTable));