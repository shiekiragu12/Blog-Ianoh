import React, { useState } from 'react';
import Header from './Header'
import SideBar from './SideBar'
import { Form, FormControl, Button, Table } from 'react-bootstrap'
import './Reports.scss'
import Chart from 'react-apexcharts';


function Reports() {
  // declaration for the purpose of using it on the table
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('');

  //the data to be displayed on the table
  const reportdata = [
    { id: 1, mpesaCode: "MP001", amount: 100, user: "John", datePaid: "2023-05-01" },
    { id: 2, mpesaCode: "MP002", amount: 200, user: "Jane", datePaid: "2023-05-02" },
    { id: 3, mpesaCode: "MP003", amount: 150, user: "Alex", datePaid: "2023-05-03" },
    { id: 4, mpesaCode: "MP004", amount: 120, user: "Sarah", datePaid: "2023-05-04" },
    { id: 5, mpesaCode: "MP005", amount: 180, user: "Michael", datePaid: "2023-05-05" },
    { id: 6, mpesaCode: "MP006", amount: 90, user: "Emily", datePaid: "2023-05-06" },
    { id: 7, mpesaCode: "MP007", amount: 300, user: "David", datePaid: "2023-05-07" },
    { id: 8, mpesaCode: "MP008", amount: 250, user: "Sophia", datePaid: "2023-05-08" },
    { id: 9, mpesaCode: "MP009", amount: 180, user: "William", datePaid: "2023-05-09" },
    { id: 10, mpesaCode: "MP010", amount: 120, user: "Olivia", datePaid: "2023-05-10" },
    { id: 11, mpesaCode: "MP011", amount: 200, user: "James", datePaid: "2023-05-11" },
    { id: 12, mpesaCode: "MP012", amount: 150, user: "Emma", datePaid: "2023-05-12" },
    { id: 13, mpesaCode: "MP013", amount: 100, user: "Alexander", datePaid: "2023-05-13" },
    { id: 14, mpesaCode: "MP014", amount: 130, user: "Ava", datePaid: "2023-05-14" },
    { id: 15, mpesaCode: "MP015", amount: 220, user: "Daniel", datePaid: "2023-05-15" },
    { id: 16, mpesaCode: "MP016", amount: 190, user: "Mia", datePaid: "2023-05-16" },
    { id: 17, mpesaCode: "MP017", amount: 280, user: "Benjamin", datePaid: "2023-05-17" },
    { id: 18, mpesaCode: "MP018", amount: 150, user: "Ella", datePaid: "2023-05-18" },
    { id: 19, mpesaCode: "MP019", amount: 130, user: "Henry", datePaid: "2023-05-19" },
    { id: 20, mpesaCode: "MP020", amount: 160, user: "Lily", datePaid: "2023-05-20" },
    { id: 1, mpesaCode: "MP001", amount: 100, user: "John", datePaid: "2023-05-01" },
    { id: 2, mpesaCode: "MP002", amount: 200, user: "Jane", datePaid: "2023-05-02" },
    { id: 3, mpesaCode: "MP003", amount: 150, user: "Alex", datePaid: "2023-05-03" },
    { id: 4, mpesaCode: "MP004", amount: 120, user: "Sarah", datePaid: "2023-05-04" },
    { id: 5, mpesaCode: "MP005", amount: 180, user: "Michael", datePaid: "2023-05-05" },
    { id: 6, mpesaCode: "MP006", amount: 90, user: "Emily", datePaid: "2023-05-06" },
    { id: 7, mpesaCode: "MP007", amount: 300, user: "David", datePaid: "2023-05-07" },
    { id: 8, mpesaCode: "MP008", amount: 250, user: "Sophia", datePaid: "2023-05-08" },
    { id: 9, mpesaCode: "MP009", amount: 180, user: "William", datePaid: "2023-05-09" },
    { id: 10, mpesaCode: "MP010", amount: 120, user: "Olivia", datePaid: "2023-05-10" },
    { id: 11, mpesaCode: "MP011", amount: 200, user: "James", datePaid: "2023-05-11" },
    { id: 12, mpesaCode: "MP012", amount: 150, user: "Emma", datePaid: "2023-05-12" },
    { id: 13, mpesaCode: "MP013", amount: 100, user: "Alexander", datePaid: "2023-05-13" },
    { id: 14, mpesaCode: "MP014", amount: 130, user: "Ava", datePaid: "2023-05-14" },
    { id: 15, mpesaCode: "MP015", amount: 220, user: "Daniel", datePaid: "2023-05-15" },
    { id: 16, mpesaCode: "MP016", amount: 190, user: "Mia", datePaid: "2023-05-16" },
    { id: 17, mpesaCode: "MP017", amount: 280, user: "Benjamin", datePaid: "2023-05-17" },
    { id: 18, mpesaCode: "MP018", amount: 150, user: "Ella", datePaid: "2023-05-18" },
    { id: 19, mpesaCode: "MP019", amount: 130, user: "Henry", datePaid: "2023-05-19" },
    { id: 20, mpesaCode: "MP020", amount: 160, user: "Lily", datePaid: "2023-05-20" },
    { id: 1, mpesaCode: "MP001", amount: 100, user: "John", datePaid: "2023-05-01" },
    { id: 2, mpesaCode: "MP002", amount: 200, user: "Jane", datePaid: "2023-05-02" },
    { id: 3, mpesaCode: "MP003", amount: 150, user: "Alex", datePaid: "2023-05-03" },
    { id: 4, mpesaCode: "MP004", amount: 120, user: "Sarah", datePaid: "2023-05-04" },
    { id: 5, mpesaCode: "MP005", amount: 180, user: "Michael", datePaid: "2023-05-05" },
    { id: 6, mpesaCode: "MP006", amount: 90, user: "Emily", datePaid: "2023-05-06" },
    { id: 7, mpesaCode: "MP007", amount: 300, user: "David", datePaid: "2023-05-07" },
    { id: 8, mpesaCode: "MP008", amount: 250, user: "Sophia", datePaid: "2023-05-08" },
    { id: 9, mpesaCode: "MP009", amount: 180, user: "William", datePaid: "2023-05-09" },
    { id: 10, mpesaCode: "MP010", amount: 120, user: "Olivia", datePaid: "2023-05-10" },
    { id: 11, mpesaCode: "MP011", amount: 200, user: "James", datePaid: "2023-05-11" },
    { id: 12, mpesaCode: "MP012", amount: 150, user: "Emma", datePaid: "2023-05-12" },
    { id: 13, mpesaCode: "MP013", amount: 100, user: "Alexander", datePaid: "2023-05-13" },
    { id: 14, mpesaCode: "MP014", amount: 130, user: "Ava", datePaid: "2023-05-14" },
    { id: 15, mpesaCode: "MP015", amount: 220, user: "Daniel", datePaid: "2023-05-15" },
    { id: 16, mpesaCode: "MP016", amount: 190, user: "Mia", datePaid: "2023-05-16" },
    { id: 17, mpesaCode: "MP017", amount: 280, user: "Benjamin", datePaid: "2023-05-17" },
    { id: 18, mpesaCode: "MP018", amount: 150, user: "Ella", datePaid: "2023-05-18" },
    { id: 19, mpesaCode: "MP019", amount: 130, user: "Henry", datePaid: "2023-05-19" },
    { id: 20, mpesaCode: "MP020", amount: 160, user: "Lily", datePaid: "2023-05-20" },
    { id: 1, mpesaCode: "MP001", amount: 100, user: "John", datePaid: "2023-05-01" },
    { id: 2, mpesaCode: "MP002", amount: 200, user: "Jane", datePaid: "2023-05-02" },
    { id: 3, mpesaCode: "MP003", amount: 150, user: "Alex", datePaid: "2023-05-03" },
    { id: 4, mpesaCode: "MP004", amount: 120, user: "Sarah", datePaid: "2023-05-04" },
    { id: 5, mpesaCode: "MP005", amount: 180, user: "Michael", datePaid: "2023-05-05" },
    { id: 6, mpesaCode: "MP006", amount: 90, user: "Emily", datePaid: "2023-05-06" },
    { id: 7, mpesaCode: "MP007", amount: 300, user: "David", datePaid: "2023-05-07" },
    { id: 8, mpesaCode: "MP008", amount: 250, user: "Sophia", datePaid: "2023-05-08" },
    { id: 9, mpesaCode: "MP009", amount: 180, user: "William", datePaid: "2023-05-09" },
    { id: 10, mpesaCode: "MP010", amount: 120, user: "Olivia", datePaid: "2023-05-10" },
    { id: 11, mpesaCode: "MP011", amount: 200, user: "James", datePaid: "2023-05-11" },
    { id: 12, mpesaCode: "MP012", amount: 150, user: "Emma", datePaid: "2023-05-12" },
    { id: 13, mpesaCode: "MP013", amount: 100, user: "Alexander", datePaid: "2023-05-13" },
    { id: 14, mpesaCode: "MP014", amount: 130, user: "Ava", datePaid: "2023-05-14" },
    { id: 15, mpesaCode: "MP015", amount: 220, user: "Daniel", datePaid: "2023-05-15" },
    { id: 16, mpesaCode: "MP016", amount: 190, user: "Mia", datePaid: "2023-05-16" },
    { id: 17, mpesaCode: "MP017", amount: 280, user: "Benjamin", datePaid: "2023-05-17" },
    { id: 18, mpesaCode: "MP018", amount: 150, user: "Ella", datePaid: "2023-05-18" },
    { id: 19, mpesaCode: "MP019", amount: 130, user: "Henry", datePaid: "2023-05-19" },
    { id: 20, mpesaCode: "MP020", amount: 160, user: "Lily", datePaid: "2023-05-20" },
  ];

  // Filtering function
  const filterData = (reportdata) => {
    return (
      reportdata.id.toString().includes(filter) ||
      reportdata.mpesaCode.includes(filter) ||
      reportdata.amount.toString().includes(filter) ||
      reportdata.user.includes(filter) ||
      reportdata.datePaid.includes(filter)
    );
  };

  // Searching function
  const searchData = (reportdata) => {
    if (searchTerm === '') return true;

    return (
      reportdata.id.toString().includes(searchTerm) ||
      reportdata.mpesaCode.includes(searchTerm) ||
      reportdata.amount.toString().includes(searchTerm) ||
      reportdata.user.includes(searchTerm) ||
      reportdata.datePaid.includes(searchTerm)
    );
  };
  // Sort function
  const sortByColumn = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const sortedData = reportdata
    .filter(filterData)
    .filter(searchData)
    .sort((a, b) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Event handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // the pie chart
  const chartOptionsPie = {
    chart: {
      id: 'small-chart',
      width: '300px',
      toolbar: {
        show: false
      }
    },
    title: {
      text: 'My Donut Chart',
      align: 'right',

    },
    // Add your chart data and configurations here
    series: [44, 55, 41, 17, 15, 40, 5, 44, 55, 41, 17, 15],
    options: {
      labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%'
          }
        }
      }
    }
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className='reports'>
        <h2>Your Financial Report</h2>

        <div className='filterSelects'>

          <FormControl
            type="text"
            placeholder="Search By Invoice Number"
            className="mr-sm-2"
          />

          <Form.Select>
            <option>By Month</option>
            <option>By Year</option>
            <option>By Week</option>
          </Form.Select>

          <Form.Select>
            <option>Highest Paid Month</option>
            <option>Highest Paid Year</option>
            <option>Highest Paid Week</option>
          </Form.Select>

          <Button>Filter Report</Button>
        </div>
        <h3 className='summary'>Summary of Income Obtained</h3>
        <div className='topReports'>

          <div className='table'>

            {/* <div>
            <label htmlFor="filter">Filter:</label>
            <input
              id="filter"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div> */}

            <div>
              <label htmlFor="search">Search:</label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table className='table-hover min-w-[640px] tableReports'>
              <thead>
                <tr>
                  <th onClick={() => sortByColumn('id')}>
                    Blog's ID<span className='ms-3 bi bi-arrows-angle-contract'></span> {sortColumn === 'id'}
                  </th>
                  <th onClick={() => sortByColumn('mpesaCode')}>
                    Mpesa Code <span className='ms-3 bi bi-arrows-angle-contract'></span>{sortColumn === 'mpesaCode'}
                  </th>
                  <th onClick={() => sortByColumn('amount')}>
                    Amount <span className='ms-3 bi bi-arrows-angle-contract'></span> {sortColumn === 'amount'}
                  </th>
                  <th onClick={() => sortByColumn('user')}>
                    Blog's User <span className='ms-3 bi bi-arrows-angle-contract'></span> {sortColumn === 'user'}
                  </th>
                  <th onClick={() => sortByColumn('datePaid')}>
                    Date Paid <span className='ms-3 bi bi-arrows-angle-contract'></span> {sortColumn === 'datePaid'}
                  </th>
                </tr>

              </thead>
              <tbody>
                {currentRows.map((data) => (
                  <tr key={data.month}>
                    <td>{data.id}</td>
                    <td>{data.mpesaCode}</td>
                    <td>Ksh {data.amount}</td>
                    <td>{data.user}</td>
                    <td>{data.datePaid}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className='prevNext'>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
          <div className='pieReport'>
            <Chart
              options={chartOptionsPie.options}
              series={chartOptionsPie.series}
              type="donut" // Set the chart type to 'donut'
              width={chartOptionsPie.chart.width}
            />
          </div>


        </div>
      </div>
    </>
  )
}

export default Reports