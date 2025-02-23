import React, { useState } from "react";
import { Table, Button, Modal, Form, Container, Navbar, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("credit");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default mode set to dark mode
  const navigate = useNavigate();

  const handleAddTransaction = () => {
    setTransactions([...transactions, { amount: parseFloat(amount), note, type, date: new Date() }]);
    setShowAddTransaction(false);
    setSuccessMessage("Transaction added successfully!");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditTransaction = () => {
    const updatedTransactions = [...transactions];
    updatedTransactions[currentTransactionIndex] = {
      ...updatedTransactions[currentTransactionIndex],
      amount: parseFloat(amount),
      note,
      type,
    };
    setTransactions(updatedTransactions);
    setShowEditTransaction(false);
    setSuccessMessage("Transaction edited successfully!");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    setSuccessMessage("Transaction deleted successfully!");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLogout = () => {
    // Clear session or token
    navigate("/");
  };

  const openEditModal = (index) => {
    setCurrentTransactionIndex(index);
    setAmount(transactions[index].amount);
    setNote(transactions[index].note);
    setType(transactions[index].type);
    setShowEditTransaction(true);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTransactions = transactions.filter((trans) => {
    if (filter === "all") return true;
    return trans.type === filter;
  });

  const income = transactions.filter(trans => trans.type === "credit").reduce((acc, trans) => acc + trans.amount, 0);
  const expense = transactions.filter(trans => trans.type === "debit").reduce((acc, trans) => acc + trans.amount, 0);

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Transactions',
        data: [income, expense],
        backgroundColor: ['limegreen', 'red'],
        borderColor: ['limegreen', 'red'],
        borderWidth: 1,
      },
    ],
  };

  let runningBalance = 0;

  return (
    <div style={{ backgroundColor: isDarkMode ? "#2e1f47" : "#f8f9fa", minHeight: "100vh", color: isDarkMode ? "#ffffff" : "#000000" }}>
      <Navbar expand="lg" style={{ backgroundColor: "#003366" }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "#ffffff", fontSize: "2rem" }}>
            Finance Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Button variant="outline-light" onClick={handleLogout} style={{ color: "red" }}>
              Logout
            </Button>
            <Button variant="outline-light" onClick={toggleTheme} className="ms-2">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1 className="my-4">Dashboard</h1>
        {showSuccess && <Alert variant="success">{successMessage}</Alert>}
        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={() => setShowAddTransaction(true)}>
              Add Transaction
            </Button>
            <Button variant="info" className="ms-2" onClick={toggleChart}>
              {showChart ? "Hide Chart" : "Show Chart"}
            </Button>
            <Button variant="secondary" className="ms-2" onClick={() => handleFilterChange("all")}>
              All
            </Button>
            <Button variant="success" className="ms-2" onClick={() => handleFilterChange("credit")}>
              Income
            </Button>
            <Button variant="danger" className="ms-2" onClick={() => handleFilterChange("debit")}>
              Expense
            </Button>
          </Col>
        </Row>

        {showChart && (
          <Row className="mb-3 justify-content-center">
            <Col xs="auto">
              <div style={{ width: '300px', height: '300px' }}>
                <Pie data={chartData} />
              </div>
            </Col>
          </Row>
        )}

        <Table striped bordered hover className="my-3" variant={isDarkMode ? "dark" : "light"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((trans, index) => {
              runningBalance += trans.type === "credit" ? trans.amount : -trans.amount;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{trans.date.toLocaleString()}</td>
                  <td style={{ color: trans.type === "credit" ? "limegreen" : "red" }}>
                    {trans.type === "credit" ? "Income" : "Expense"}
                  </td>
                  <td>{trans.amount}</td>
                  <td>{trans.note}</td>
                  <td style={{ color: runningBalance >= 0 ? "limegreen" : "red" }}>{runningBalance}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => openEditModal(index)}>Edit</Button>
                    <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDeleteTransaction(index)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Modal to add a new transaction */}
        <Modal show={showAddTransaction} onHide={() => setShowAddTransaction(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="credit">Income</option>
                  <option value="debit">Expense</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter note"
                />
              </Form.Group>

              <Button variant="primary" onClick={handleAddTransaction}>
                Add Transaction
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal to edit an existing transaction */}
        <Modal show={showEditTransaction} onHide={() => setShowEditTransaction(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="credit">Income</option>
                  <option value="debit">Expense</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter note"
                />
              </Form.Group>

              <Button variant="primary" onClick={handleEditTransaction}>
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;