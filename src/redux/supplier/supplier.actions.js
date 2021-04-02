import SupplierActionTypes from './supplier.types';

export const addSupplier = (supplier) => ({
    type: SupplierActionTypes.ADD_SUPPLIER,
    payload: supplier
});

export const fetchSuppliers = (suppliers) => ({
    type: SupplierActionTypes.FETCH_SUPPLIERS,
    payload: suppliers
})