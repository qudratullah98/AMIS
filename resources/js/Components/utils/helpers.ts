export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Extract the date part only
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
};