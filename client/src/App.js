import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBars, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    inquiryNo: '',
    customerName: '',
    customerEmail: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:6001/getbooks');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePdfGeneration = (inquiryDate, customerName, customerEmail) => {
    // Create a new instance of jsPDF
    const pdf = new jsPDF();

    // Define the content for the PDF
    const content = `
      Inquiry Details
      Inquiry Date: ${inquiryDate}
      Customer Name: ${customerName}
      Customer Email: ${customerEmail}
    `;

    // Add the content to the PDF
    pdf.text(content, 10, 10);

    // Save the PDF as a file with a specific name
    pdf.save('inquiry_details.pdf');
  };

  const applyFilters = () => {
    return books.filter(book => {
      return (
        book.Inquiry_No.toLowerCase().includes(filters.inquiryNo.toLowerCase()) &&
        book.Customer_name.toLowerCase().includes(filters.customerName.toLowerCase()) &&
        book.Customer_email.toLowerCase().includes(filters.customerEmail.toLowerCase())
      );
    });
  };

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const toggleFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };

  const filteredBooks = applyFilters();

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  const totalCustomers = filteredBooks.length;

  return (
    <div className="wrapper">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </h2>
        </div>
        <div className="nav-buttons">
          <button className="nav-button inquiry">
            <FontAwesomeIcon icon={faBars} /> Inquiry
          </button>
          <button className="nav-button">
            <FontAwesomeIcon icon={faBars} /> Description
          </button>
        </div>
      </div>
      <div className="content">
        <div className="welcome-message">
          <h1>All Inquiry</h1>
          <div className="user-icon">
            <FontAwesomeIcon icon={faUser} />
            <span>Total Inquiry: {totalCustomers}</span>
          </div>
          <div className="filter-button" onClick={toggleFilterVisible}>
           Filter <FontAwesomeIcon icon={faFilter} /> 
          </div>
          {filterVisible && (
            <div className="filters">
              <input
                type="text"
                name="inquiryNo"
                placeholder="Inquiry No."
                value={filters.inquiryNo}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={filters.customerName}
                onChange={handleFilterChange}
              />
              <input
                type="text"
                name="customerEmail"
                placeholder="Customer Email"
                value={filters.customerEmail}
                onChange={handleFilterChange}
              />
            </div>
          )}
        </div>
        <div className="container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Inquiry No.</th>
                <th>Customer Name</th>
                <th>Customer email</th>
                <th>Inquiry document</th>
                <th>Extracted inquiry document</th>
                <th>Quotation no</th>
                <th>Quotation date</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.Inquiry_No}</td>
                  <td>{book.Customer_name || ''}</td>
                  <td>{book.Customer_email || ''}</td>
                  <td onClick={() => handlePdfGeneration(book.Inquiry_No, book.Customer_name, book.Customer_email)}>
                    {book.Pdf_id || ''}
                  </td>
                  <td>{''}</td>
                  <td>{''}</td>
                  <td>{''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
