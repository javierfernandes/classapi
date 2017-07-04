

export const propertyValues = (obj) => Object.keys(obj).map(k => obj[k])

export const properties = obj => Object.keys(obj).map(k => ({ name: k, value: obj[k] }))
