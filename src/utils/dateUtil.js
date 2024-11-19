export const parseDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") {
        throw new Error("Invalid date string");
    }

    const [day, month, year] = dateStr.split("/");

    if (!day || !month || !year) {
        throw new Error("Date string format should be 'DD/MM/YYYY'");
    }

    return new Date(`${year}-${month}-${day}`);
};
