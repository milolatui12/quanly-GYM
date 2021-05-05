export const fetchReceipt = (receipts) => {
    return receipts.map(rcp => ({ ...rcp, rcp_date: rcp.rcp_date.slice(0, 10) }))
}

export const deleteReceipt = (receipts, id) => {
    return [...receipts.filter(rcp => rcp.rcp_code != id)]
}