import { createSelector } from 'reselect';

const selectSupplier = state => state.suppliers;

export const selectSuppliers = createSelector(
    [selectSupplier],
    suppliers => suppliers.suppliers
)