import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import date from 'date-and-time';
import ReactToPrint from 'react-to-print';

import { deleteEquip } from '../../redux/equipment/equipment.actions';
import DatePicker from '../date-picker/date-picker.component';

import { Table, kaReducer } from 'ka-table';
import { search } from 'ka-table/actionCreators';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

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

const handleDel = async (id, userId, delEquip) => {
  try {
  await axios.post('http://localhost:3030/delete-equipment', {
      id: id,
      accountId: userId
    })
    delEquip(id)
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
const DeleteButton = ({ rowData, userId, delEquip }) => {
  return (
   <div className='edit-cell-button'>
     <RiDeleteBin2Fill
      alt='Delete Row'
      title='Delete Row'
      onClick={() => handleDel(rowData.id, userId, delEquip)}
    />
   </div>
  );
};

const EquipTable = ({ equips, history, match, delEquip, userId }) => {
  const now = new Date
  const [fDate, setDate] = useState({ start: '', end: now.toDateString()})
  const handleChange = event => {
    const { value, name } = event.target;

    setDate({ ...fDate, [name]: value });
  }
  const dataArray = equips.filter(x => x.rcp_date >= fDate.start && x.rcp_date <= fDate.end).map(
    (x, index) => ({
      order: `${index + 1}`,
      rcpDate: x.rcp_date,
      name: x.eg_name,
      warranty: x.warranty > now? "còn hạn": "hết hạn",
      supplier: x.name,
      descript: x.des,
      status: x.state_des,
      id: x.id,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'id', title: 'ID', dataType: DataType.String, style: {width: 50} },
      //{ key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'name', title: 'TÊN', dataType: DataType.String, style: {width: 150} },
      { key: 'rcpDate', title: 'NGÀY NHẬP', dataType: DataType.Date, style: {width: 150} },
      { key: 'warranty', title: 'BẢO HÀNH', dataType: DataType.String, style: {width: 150} },
      { key: 'supplier', title: 'NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 150} },
      { key: 'descript', title: 'MÔ TẢ', dataType: DataType.String, style: {width: 200} },
      { key: 'status', title: 'TÌNH TRẠNG', dataType: DataType.String, style: {width: 150} },
      { key: 'editColumn', title: '',  style: {width: 50, cursor: "pointer"}},
      { key: 'deleteColumn', title: '',  style: {width: 50, cursor: "pointer"}},
    ],
    loading: {
      enabled: false
    },
    format: ({ column, value }) => {
      if (column.dataType === DataType.Date){
        return value && value.toLocaleDateString('en-GB', {month: '2-digit', day: '2-digit', year: 'numeric' });
      }
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
  }, [equips, fDate])
  const dispatch = async (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  }
  const componentRef = useRef(dataArray); 

  return (
    <div>
      <div className="search-filter">
        <DatePicker value={fDate} name="start" handleChange={handleChange} />
        <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
          dispatch(search(event.currentTarget.value));
        }} className='search' placeholder="tìm kiếm"/>
      </div>
      {/* <button onClick={() => window.print()}>PRINT</button> */}
      <Table
        {...tableProps} 
        dispatch={dispatch}
        childComponents={{
          ...bootstrapChildComponents,
          cellText: {
            content: (props) => {
              if (props.column.key === 'editColumn'){
                return <EditButton {...props} history={history} match={match} />
              }
              if (props.column.key === 'deleteColumn'){
                return <DeleteButton {...props} delEquip={delEquip} userId={userId} />
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
      />
    </div>
  );
};

const mapStateToProps =({ user }) => ({
  userId: user.currentUser.id
})

const mapDispatchToProps = dispatch => ({
  delEquip: id => dispatch(deleteEquip(id))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EquipTable));