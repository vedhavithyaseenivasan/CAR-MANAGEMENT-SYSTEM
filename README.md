# 🚗 Car Management System

A comprehensive **Car Management System** built as part of our **Database Management Systems (DBMS)** course project. The system is designed to efficiently manage vehicle data, customers, billing, and loans — ideal for car rental services, dealerships, or fleet management organizations.

## 📘 Project Overview

In today’s fast-paced world, managing vehicles efficiently is essential for businesses and individuals alike. This project aims to create a centralized database system to support:

- Vehicle inventory
- Customer information
- Car models and types
- Billing and rental management
- Loan processing for vehicle purchases

---

## 👨‍💻 Team Members

- P. Praveena - 22ITR079  
- K. Vasumathi - 22ITR114  
- S. Vedhavithya - 22ITR115  

---

## 🗂️ Features

- **Vehicle Inventory Management**  
  Track vehicle details: make, model, year, VIN, availability, and registration status.

- **Customer Management**  
  Store customer details including name, phone number, address, and identification.

- **Car Classification**  
  Categorize cars by type (e.g., Sedan, SUV, Luxury) and maintain specifications.

- **Billing System**  
  Handle rental fees, taxes, insurance, and support multiple payment methods.

- **Loan Management**  
  Accept and manage loan applications for car purchases.

---

## 🛠️ Database Schema

### Tables:

- `Customer(cus_id, name, phone_num, address)`
- `Car_Model(car_id, car_model, car_price)`
- `Car_Type(car_id, c_name)`
- `Car_Details(car_id, mileage, color)`
- `Billing(bill_id, cus_id, car_id, car_model, car_price, advance_amt, amt_balance)`
- `Loan(loan_no, cus_id, car_model, mon_loan)`

### Sample ER Diagram:
> Refer to the project report for a detailed ER model.

---

## 🔍 SQL Highlights

### DDL Example:
```sql
CREATE TABLE Customer (
  cus_id VARCHAR(7) PRIMARY KEY,
  name VARCHAR(15),
  phone_num NUMBER(10),
  address VARCHAR(15)
);
```
### DML Example:
```sql
INSERT INTO Customer VALUES ('115', 'vedha', '6380077879', 'VNR');
```
### Join Query:
```sql
SELECT loan.cus_id  
FROM billing 
INNER JOIN loan ON billing.cus_id = loan.cus_id;
```
### Nested Query:
```sql
SELECT car_price 
FROM carmodel 
WHERE car_model = (
  SELECT car_model 
  FROM billing 
  WHERE bill_id = '101'
);
```

---

### 📌 How to Use

- 1.Clone the repository:
  ``` bash
  git clone https://github.com/vedhavithyaseenivasan/CAR_MANAGEMENT-SYSTEM.git
```

- 2.Open the SQL scripts in any DBMS tool (e.g., Oracle, MySQL, PostgreSQL).

- 3.Execute the DDL queries to create tables.

- 4.Use DML queries to insert data.

- 5.Perform operations (billing, loan processing, queries, etc.)

