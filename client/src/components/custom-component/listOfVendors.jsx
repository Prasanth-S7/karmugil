import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
    Table,
    TableBody,
    TableCell,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function ListofVendors() {
    const [shops, setShops] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchCSV() {
            try {
                const response = await fetch('/assets/tn_pds_fairprice_shops_1.csv');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const text = await response.text();
                const results = Papa.parse(text, { header: true });
                setShops(results.data);
                setTotalPages(Math.ceil(results.data.length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching or parsing CSV:', error);
            }
        }
        fetchCSV();
    }, []);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = shops.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Table className="mt-3 px-5 w-full rounded-md">
                <TableCaption>A list of shops.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">SNO</TableHead>
                        <TableHead className="w-[100px]">District Name</TableHead>
                        <TableHead className="w-[100px]">Taluk Name</TableHead>
                        <TableHead className="w-[100px]">Village Name</TableHead>
                        <TableHead className="w-[100px]">Shop Code</TableHead>
                        <TableHead className="w-[100px]">Shop Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((shop, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{shop["Sl.No"]}</TableCell>
                            <TableCell>{shop["District Name"]}</TableCell>
                            <TableCell>{shop["Taluk Name"]}</TableCell>
                            <TableCell>{shop["Village Name"]}</TableCell>
                            <TableCell>{shop["Shop Code"]}</TableCell>
                            <TableCell>{shop["Shop Name"]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) {
                                    handlePageChange(currentPage - 1);
                                }
                            }}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={index + 1 === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(index + 1);
                                }}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Ellipsis and Next Button */}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) {
                                        handlePageChange(currentPage + 1);
                                    }
                                }}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
