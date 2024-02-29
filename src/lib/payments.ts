export type CourseTableStatus = "pending" | "processing" | "success" | "failed"

export const courseTableStatuses: CourseTableStatus[] = ["pending", "processing", "success", "failed"];

export type CourseTableType = {
    id: string
    title: string,
    price: number,
    totalSales: number,
    status: CourseTableStatus
    createDate: Date
}

export const payments: CourseTableType[] = [
    {
        id: "728ed52f",
        status: "pending",
        title: "Kurs 1",
        price: 100,
        totalSales: 10,
        createDate: new Date(),
    },
    {
        id: "728ed5213212312f",
        status: "pending",
        title: "Kurs 2",
        price: 100,
        totalSales: 10,
        createDate: new Date(),
    },
    {
        id: "728ed52werqwqrw13212312f",
        status: "pending",
        title: "Kurs 3",
        price: 100,
        totalSales: 10,
        createDate: new Date(),
    },
    {
        id: "728ed5213rqwrwqqrw212312f",
        status: "pending",
        title: "Kurs 4",
        price: 100,
        totalSales: 10,
        createDate: new Date(),
    },
]
