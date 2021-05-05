import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { deleteEquipmentGroup } from '../../redux/equipment-group/equipment-group.actions';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import "ka-table/style.css";

const DeleteButton = ({ rowData, deleteEG }) => {
  return (
   <div className='edit-cell-button'>
     <img
      src='https://komarovalexander.github.io/ka-table/static/icons/delete.svg'
      alt='Delete Row'
      title='Delete Row'
      onClick={() => deleteEG(rowData.id)}
    />
   </div>
  );
};

const DeviceTable = ({ devices, deleteEG }) => {
  const dataArray = devices.map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.name,
      batch: x.batch,
      warrantyPeriod: x.warrantyPeriod,
      unit: x.unit,
      quantity: x.quantity,
      price: x.price,
      total: x.quantity*x.price,
      id: index,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      //{ key: 'column2', title: 'MÃ TB', dataType: DataType.String, style: {width: 70} },
      { key: 'name', title: 'TÊN TB', dataType: DataType.String, style: {width: 200} },
      { key: 'batch', title: 'LÔ HÀNG', dataType: DataType.String, style: {width: 100} },
      { key: 'warrantyPeriod', title: 'HẠN BH', dataType: DataType.String, style: {width: 100} },
      { key: 'unit', title: 'ĐVT', dataType: DataType.String, style: {width: 50} },
      { key: 'quantity', title: 'SỐ LƯỢNG', dataType: DataType.String, style: {width: 100} },
      { key: 'price', title: 'ĐƠN GIÁ', dataType: DataType.Number, style: {width: 100} },
      { key: 'total', title: 'THÀNH TIỀN', dataType: DataType.Number, style: {width: 100} },
      { key: 'deleteColumn', title: '',  style: {width: 50, cursor: "pointer"}}
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
      {...tableProps}
      childComponents={{
        cellText: {
          content: (props) => {
            if (props.column.key === 'deleteColumn'){
              return <DeleteButton {...props} deleteEG={deleteEG} />
            }
          }
        }
      }}
      dispatch={dispatch}
    />
  );
};


const mapDispatchToProps = dispatch => ({
  deleteEG: id => dispatch(deleteEquipmentGroup(id))
})

export default connect(null, mapDispatchToProps)(DeviceTable);