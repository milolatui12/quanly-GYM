import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { search } from 'ka-table/actionCreators';
import DatePicker from '../date-picker/date-picker.component';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';


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

const RecordStateTable = ({ records }) => {
  const now = new Date
  const [fDate, setDate] = useState({ start: '', end: now.toDateString()})
  const handleChange = event => {
    const { value, name } = event.target;

    setDate({ ...fDate, [name]: value });
  }
  const dataArray = records.filter(x => x.state_date >= fDate.start && x.state_date <= fDate.end).map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.eg_name,
      state_des: x.state_des,
      act: x.act,
      date: x.state_date.slice(0, 19).replace(/T/gi, " "),
      equip_id: x.equip_id,
      id: index,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'name', title: 'TÊN THIẾT BỊ', dataType: DataType.String, style: {width: 200} },
      { key: 'equip_id', title: 'ID THIẾT BỊ', dataType: DataType.String, style: {width: 150} },
      { key: 'state_des', title: 'TÌNH TRẠNG', dataType: DataType.String, style: {width: 150} },
      { key: 'act', title: 'HÀNH ĐỘNG', dataType: DataType.String, style: {width: 150} },
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
  }, [records, fDate])
  const dispatch = action => {
    changeTableProps(prevState => kaReducer(prevState, action));
  };

  return (
    <div>
      <div className="search-filter">
        <DatePicker value={fDate} name="start" handleChange={handleChange} />
        <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
          dispatch(search(event.currentTarget.value));
        }} className='search' placeholder="tìm kiếm"/>
      </div>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          ...bootstrapChildComponents,
          noDataRow: {
            content: () => 'No Data Found'
          },
          tableWrapper: {
            elementAttributes: () => ({ style: { maxHeight: 500 }})
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