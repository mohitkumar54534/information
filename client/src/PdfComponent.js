

import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const PdfComponent = ({ inquiryDate, customerName, customerEmail }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Inquiry Details</Text>
            <Text style={styles.text}>Inquiry Date: {inquiryDate}</Text>
            <Text style={styles.text}>Customer Name: {customerName}</Text>
            <Text style={styles.text}>Customer Email: {customerEmail}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfComponent;
