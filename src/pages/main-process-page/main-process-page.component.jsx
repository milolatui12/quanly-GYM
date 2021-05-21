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
import EquipmentEdit from '../equipment-edit-page/equipment-edit-page.component';
import BodyWrapper from '../../components/body-wrapper/body-wrapper.component';
import AccountPage from '../../pages/account-page/account-page.component';
import ProfilePage from '../../pages/profile-page/profile-page.component';

import './main-process-page.styles.scss';

const MainProcessPage = () => {
    return (
      <BrowserRouter>
        <div className="main-container">
            {/* <Header /> */}
            <BodyWrapper />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/account" component={AccountPage} />
              <Route exact path="/suppliers" component={SupplierPage} />
              <Route exact path="/receipt" component={ReceiptPage} />
              <Route exact path="/receipt/adddevice" component={AddDevicePage} />
              <Route exact path="/equipment" component={EquipmentPage} />
              <Route path="/suppliers/:suppId" component={SupplierEdit} />
              <Route exact path="/receipt/:rcpId" component={ReceiptEdit} />
              <Route exact path="/equipment/:equipId" component={EquipmentEdit} />
              <Route exact path="/profile" component={ProfilePage} />
            </Switch>
        </div>
      </BrowserRouter>
    )
}



export default MainProcessPage;