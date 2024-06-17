export const convertDate = data => {
    const datetime = new Date(data);
    return datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString()
};