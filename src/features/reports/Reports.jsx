
import { useState } from "react";
import { useGetOrdersQuery } from "../orders/ordersApiSlice";

import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    BarChart,
    Bar,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    YAxis,
} from "recharts";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";

const Reports = () => {

    const [filter, setFilter] = useState(new Date().getFullYear());

    const {
        data: ordersData,
        isLoading: isLoadingOrders,
        isSuccess: isOrdersSuccess,
        isError: isOrdersError,
        error: ordersError,
    } = useGetOrdersQuery("ordersList", {
        pollingInterval: 10000, // refresh data every 10 seconds
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    // Combined loading state
    const isLoading = isLoadingOrders;

    // Combined success state
    const isSuccess = isOrdersSuccess;

    // Combined error state
    const isError = isOrdersError;
    const error = ordersError;


    let content;

    if (isLoading) {
        content = <PageLoader />
    }

    if (isError) {
        content = <PageError error={error?.data?.message} />
    }

    if (isSuccess) {

        const { entities: ordersEntities } = ordersData;



        // Sort orders by recent or current date
        const orders = Object.values(ordersEntities).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))


        const yearOrders = [...new Set(orders.map(order => new Date(order.dateTime).getFullYear()))];

        const filterOrdersByYear = (year) => {
            return orders.filter(order => new Date(order.dateTime).getFullYear() === year);
        };

        const filteredOrders = filter === 'all'
            ? orders
            : filterOrdersByYear(parseInt(filter));

        const totalSales = filteredOrders.reduce((total, order) => total + Number(order.total), 0);

        const handleFilterChange = (event) => {
            setFilter(event.target.value);
        };



        // Step 1: Function to format date as "Sep 5, 2024"
        const formatDate = (dateStr) => {
            const options = { timeZone: 'Asia/Manila', year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateStr).toLocaleDateString('en-US', options);
        };

        // Step 2-4: Group by date and sum the total
        const groupedSalesOrders = filteredOrders.reduce((acc, order) => {
            const date = formatDate(order.dateTime); // Format the date

            // Check if date already exists in the accumulator
            const existingOrder = acc.find(item => item.date === date);

            if (existingOrder) {
                // If date exists, sum the totals
                existingOrder.Total += order.total

            } else {
                // If date doesn't exist, create a new entry
                acc.push({ date, Total: order.total });
            }
            return acc;
        }, []);

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
        };

        content = (
            <div aria-label="Page Header">
                {/* <ReceiptModal isOpen={isModalOpen} onClose={handleModalClose} orderId={orderId} /> */}

                <div className={`mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 no-print`}>
                    <div className="mt-2">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-xl font-bold text-gray-700 sm:text-2xl dark:text-gray-200">
                                    Sales Summary
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto max-w-screen-xl  py-3  md:py-5">
                            <dl className="font-normal grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                <article className="rounded-lg border border-gray-100 bg-white ">
                                    <div className="flex items-center justify-between px-5 pt-4 pb-3 ">
                                        <div className="flex flex-col">
                                            <p className="text-[11px] font-semibold text-gray-500 tracking-widest">TOTAL SALES</p>
                                            <p className="text-2xl font-medium text-gray-900">₱ {Number(totalSales).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                        </div>

                                        {/* <span className="rounded-xl bg-green-100 p-3 text-green-600">
                          <PiMoneyLight size={25} className="text-green-600 dark:text-gray-500" />
                        </span> */}
                                        <div className="mb-auto" title="Filter by Year">
                                            <select
                                                className="border rounded p-1"
                                                value={filter}
                                                onChange={handleFilterChange}
                                            >

                                                {yearOrders.map((year, index) => (
                                                    <option key={index} value={year}>{year}</option>
                                                ))}
                                                <option value="all">All</option>
                                            </select>
                                        </div>
                                    </div>
                                </article>

                            </dl>
                            {/* <TablePagination data={orders} rowsPerPage={2} /> */}
                        </div>

                        {/* Orders Table */}
                        <div className="grid grid-cols-1 gap-4 ">

                            <div className=" h-96 min-w-full rounded bg-white col-span-1 lg:col-span-2">
                                <div className="flex w-[100%] h-[100%] ">
                                    <ResponsiveContainer width={"100%"} height={"100%"}>
                                        <LineChart data={groupedSalesOrders} margin={{
                                            top: 35,
                                            right: 30,
                                            left: 35,
                                            bottom: 20,
                                        }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis tickFormatter={formatCurrency} />
                                            <Tooltip content={(props) => (
                                                <div>
                                                    {props.payload?.map((item, idx) => {
                                                        return (
                                                            <div className="flex flex-col gap-2 bg-slate-800 border text-xs  font-medium py-3 px-5 rounded-md shadow-lg "
                                                                key={idx}
                                                            >
                                                                <div className="flex gap-1 items-center">
                                                                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                                                    <p className="text-gray-50 font-medium">
                                                                        {` ${(item.payload.date)}`}
                                                                    </p>
                                                                </div>
                                                                <p className="text-gray-400 text-[11px]">TOTAL:
                                                                    <span className="font-medium text-xs text-gray-50 ">
                                                                        {`  ₱ ${(item.payload.Total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                                                                    </span>
                                                                </p>

                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )} />
                                            <Line type="monotone" dataKey="Total" stroke="orange" strokeWidth={1.5} fill="orange" />
                                        </LineChart>
                                    </ResponsiveContainer>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return content;
}

export default Reports