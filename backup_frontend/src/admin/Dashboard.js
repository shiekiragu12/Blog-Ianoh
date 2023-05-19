import React from 'react';
import './Dashboard.scss';
import Header from './Header';
import SideBar from './SideBar';
import { Card, Table } from 'react-bootstrap';
import Chart from 'react-apexcharts';


function Dashboard() {
  const blogData = [
    { id: '1', month: 'January', tag: 'Technology', blogsRead: 100, income: 500, user: 'John Doe' },
    { id: '2', month: 'February', tag: 'Health', blogsRead: 150, income: 600, user: 'Jane Smith' },
    { id: '3', month: 'March', tag: 'Travel', blogsRead: 200, income: 800, user: 'Mark Johnson' },
    { id: '4', month: 'April', tag: 'Food', blogsRead: 180, income: 700, user: 'Emily Davis' },
    { id: '5', month: 'May', tag: 'Sports', blogsRead: 250, income: 900, user: 'Michael Brown' },
    { id: '6', month: 'June', tag: 'Fashion', blogsRead: 300, income: 100, user: 'Sophia Wilson' },
    { id: '7', month: 'July', tag: 'Music', blogsRead: 280, income: 950, user: 'Oliver Thompson' },
    { id: '8', month: 'August', tag: 'Art', blogsRead: 350, income: 120, user: 'Ava Martinez' },
    { id: '9', month: 'September', tag: 'Business', blogsRead: 400, income: 150, user: 'Noah Taylor' },
    { id: '10', month: 'October', tag: 'Science', blogsRead: 380, income: 140, user: 'Emma Anderson' },
    { id: '11', month: 'November', tag: 'Politics', blogsRead: 420, income: 160, user: 'Liam Wilson' },
    { id: '12', month: 'December', tag: 'Nature', blogsRead: 450, income: 180, user: 'Mia Johnson' },
  ];
  
  const chartOptions = {
    chart: {
      id: 'small-chart',
      width: '600px',
      toolbar: {
        show: false
      }
    },
    title: {
      text: 'Blogs and Users',
      align: 'center'
    },
    // Add your chart data and configurations here
    series: [
      {
        name: 'Blogs',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 60, 70, 91, 41]
      },
      {
        name: 'Users',
        data: [10, 20, 35, 40, 29, 50, 60, 81.60, 70, 91, 52]
      }
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: ['#FF4500', '#00BFFF'] // Custom color codes for series 1 and series 2

  };
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
      align: 'center'
    },
    // Add your chart data and configurations here
    series: [44, 55, 41, 17, 15],
    options: {
      labels: ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'],
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
      <div className='dashboard'>
        {/* <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="line"
      width={chartOptions.chart.width}
    />
      <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="bar" // Set the chart type to 'bar'
      width={chartOptions.chart.width}
    />
     <Chart
      options={chartOptionsPie.options}
      series={chartOptionsPie.series}
      type="donut" // Set the chart type to 'donut'
      width={chartOptionsPie.chart.width}
    /> */}
        <div className='topDashboard'>
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="line"
            width={chartOptions.chart.width}
          />
          <div className='dashboardmetricscard'>
            <div className='d-flex'>
              <Card>
                <Card.Body>No of bloggers 205</Card.Body>
              </Card>

              <Card>
                <Card.Body>No of blogs 1,152</Card.Body>
              </Card>
            </div>
            <div className='d-flex'>

              <Card>
                <Card.Body>Total viewers 200</Card.Body>
              </Card>
              <Card>
                <Card.Body>Total Reviewers 150</Card.Body>
              </Card>
            </div>
            <div className='d-flex'>
              <Card>
                <Card.Body>Total income Ksh. 10,000</Card.Body>
              </Card>

            </div>


          </div>

        </div>

        <h2>Top Blogs Per Month </h2>
        <Table className='table-hover min-w-[640px] tableReports'>
          <thead>
            <tr>
              <th>Blog's ID</th>
              <th>Month</th>
              <th>Blog's Tag</th>
              <th>Blog's Reviews</th>
              <th>Blog's Incomes</th>
              <th>Blog's User</th>
            </tr>
          </thead>
          <tbody>
            {blogData.map((data) => (
              <tr key={data.month}>
                <td>{data.id}</td>
                <td>{data.month}</td>
                <td>{data.tag}</td>
                <td>{data.blogsRead}</td>
                <td>Ksh {data.income}</td>
                <td>{data.user}</td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>
    </>
  );
}

export default Dashboard;
