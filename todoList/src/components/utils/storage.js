export const storeDataLocal = (key, data) => {
    const values = JSON.stringify(data);
    localStorage.setItem(key, values);
}

export const getRecordsFormLocal = (key) => {
    const data = localStorage.getItem(key);
    if(data){
        return JSON.parse(data);
    }
}