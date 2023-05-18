import React from 'react';
import './Dashboard.scss';
import Header from './Header';
import SideBar from './SideBar';
import { Card, Table } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

function Dashboard() {
  const blogData = [
    { month: 'Jan', blogsRead: 100, income: 500 },
    { month: 'Feb', blogsRead: 150, income: 600 },
    { month: 'Mar', blogsRead: 200, income: 800 },
    { month: 'Apr', blogsRead: 180, income: 700 },
    { month: 'May', blogsRead: 250, income: 900 },
    { month: 'Jun', blogsRead: 300, income: 1000 },
    { month: 'Jul', blogsRead: 280, income: 950 },
    { month: 'Aug', blogsRead: 350, income: 1200 },
    { month: 'Sep', blogsRead: 400, income: 1500 },
    { month: 'Oct', blogsRead: 380, income: 1400 },
    { month: 'Nov', blogsRead: 420, income: 1600 },
    { month: 'Dec', blogsRead: 450, income: 1800 },
  ];

  return (
    <>
      <Header />
      <SideBar />
      <div className='dashboard'>
        <div className='dashboardmetricscard'>
          <Card>
            <Card.Body>No of bloggers</Card.Body>
          </Card>

          <Card>
            <Card.Body>No of blogs</Card.Body>
          </Card>

          <Card>
            <Card.Body>Total income</Card.Body>
          </Card>

          <Card>
            <Card.Body>Total Reviewers</Card.Body>
          </Card>

          <Card>
            <Card.Body>Total viewers</Card.Body>
          </Card>
        </div>

        <h2>Number of Blogs Read</h2>
        <LineChart width={800} height={300} data={blogData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='blogsRead' stroke='#8884d8' />
        </LineChart>

        <h2>Blog Statistics and Income</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Month</th>
              <th>Blogs Read</th>
              <th>Income Generated</th>
            </tr>
          </thead>
          <tbody>
            {blogData.map((data) => (
              <tr key={data.month}>
                <td>{data.month}</td>
                <td>{data.blogsRead}</td>
                <td>{data.income}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Dashboard;
