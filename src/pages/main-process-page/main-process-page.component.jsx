import React from 'react';
import { Switch, Route, BrowserRouter, withRouter } from 'react-router-dom';

import HomePage from '../home-page/home-page.component';
import Header from '../../components/header/header.component';
import SupplierPage from '../suppliers-page/suppliers-page.conponent';
import ReceiptPage from '../receipt-page/receipt-page.component';
import AddDevicePage from '../add-device-page/add-device-page.component';
import EquipmentPage from '../equipment-page/equipment-page.component';
import SupplierEdit from '../supplier-edit-page/supplier-edit-page.component';
import ReceiptEdit from '../receipt-edit-page/receipt-edit-page.component';

const MainProcessPage = () => {
    return (
      <BrowserRouter>
        <div className="main-container">
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/suppliers" component={SupplierPage} />
              <Route exact path="/receipt" component={ReceiptPage} />
              <Route exact path="/receipt/adddevice" component={AddDevicePage} />
              <Route exact path="/equipment" component={EquipmentPage} />
              <Route path="/suppliers/:suppId" component={SupplierEdit} />
              <Route path="/receipt/:rcpId" component={ReceiptEdit} />
            </Switch>
        </div>
      </BrowserRouter>
    )
}



export default MainProcessPage;