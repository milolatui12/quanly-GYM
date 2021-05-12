import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Table, kaReducer } from 'ka-table';
import { DataType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { loadData } from 'ka-table/actionCreators';

import "ka-table/style.css";


const handleDel = async (rcp_code, delReceipt) => {
  try {
    const response = await axios.post('http://localhost:3030/delete-receipt', {
      rcp_code: rcp_code
    })
    if(response.status == 200) {
      delReceipt(rcp_code)
    }
  } catch (error) {
    alert(error);
  }
}

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
const DeleteButton = ({ rowData, delReceipt }) => {
  return (
   <div className='edit-cell-button'>
     <img
      src='https://komarovalexander.github.io/ka-table/static/icons/delete.svg'
      alt='Delete Row'
      title='Delete Row'
      onClick={() => handleDel(rowData.rcp_code, delReceipt)}
    />
   </div>
  );
};

const EquipTable = ({ equips, history, match }) => {
  // let d = new Date(equips[0].rcp_date)
  // console.log(d.getDate())
  const dataArray = equips.map(
    (x, index) => ({
      order: `${index + 1}`,
      name: x.eg_name,
      warranty: x.warranty,
      supplier: x.name,
      descript: x.des,
      status: x.state_des,
      id: x.id,
    })
  );

  const tablePropsInit = {
    columns: [
      { key: 'order', title: 'STT', dataType: DataType.Number, style: {width: 50} },
      { key: 'name', title: 'TÊN', dataType: DataType.String, style: {width: 150} },
      { key: 'warranty', title: 'HẠN BẢO HÀNH', dataType: DataType.String, style: {width: 150} },
      { key: 'supplier', title: 'NHÀ CUNG CẤP', dataType: DataType.String, style: {width: 200} },
      { key: 'descript', title: 'MÔ TẢ', dataType: DataType.String, style: {width: 200} },
      { key: 'status', title: 'TÌNH TRẠNG', dataType: DataType.String, style: {width: 200} },
      { key: 'editColumn', title: '',  style: {width: 50, cursor: "pointer"}},
      { key: 'deleteColumn', title: '',  style: {width: 50, cursor: "pointer"}},
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
      childComponents={{
        cellText: {
          content: (props) => {
            if (props.column.key === 'editColumn'){
              return <EditButton {...props} history={history} match={match} />
            }
            // if (props.column.key === 'deleteColumn'){
            //   return <DeleteButton {...props} delReceipt={delReceipt} />
            // }
          }
        }
      }}
    />
  );
};


export default withRouter(EquipTable);