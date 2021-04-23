import axios from 'axios';

export const addSupplier = (suppliers, supplierToAdd) => {
    return [...suppliers, supplierToAdd];
};

export const updateSupplier = (suppliers, index, supplierUpdate) => {
    suppliers[index] = {...supplierUpdate}
    return [...suppliers]
}