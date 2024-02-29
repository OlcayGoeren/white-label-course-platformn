"use client"
import { Checkbox } from "@/components/ui/checkbox"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenu,
    DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { CourseTableType, CourseTableStatus, courseTableStatuses } from "@/lib/payments"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"

export const columns: ColumnDef<CourseTableType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Titel
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell({ row }) {
            const title = String(row.getValue("title"));
            return <Link href={"/" + row.getValue("id")} className="font-medium hover:underline">{title}</Link>
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="">Preis</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(amount)

            return <div className=" font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "totalSales",
        header: () => <div className="">Total Sales</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalSales"))

            return <div className="font-bold bg-strongYellow w-fit px-3 py-1 rounded-md text-darkBlue">{amount}</div>
        },
    },
    {
        accessorKey: "createDate",
        header: () => <div className="">Erstelldatum</div>,
        cell: ({ row }) => {
            const amount = row.getValue("createDate") as Date;
            return <div className=" font-medium">{amount.toLocaleDateString()}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell({ row }) {

            const currentStatus = row.getValue("status") as CourseTableStatus
            // CourseTableStatus
            return <Select value={currentStatus}>
                {/* className="w-[180px]" */}
                <SelectTrigger className="w-[120px]" >
                    <SelectValue placeholder={currentStatus} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {courseTableStatuses.map((status) => <SelectItem value={status}>{status}</SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

        },
    },
    {
        id: "actions",
        header(props) {
            return <div className="">Actions</div>
        },
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function CourseTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection
        },
    })



    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Kurse..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div >
    )
}
