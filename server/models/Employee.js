const db = require("../config/db.js");

async function findEmployeeByCredentials(empId, password) {
  const result = await db.query(
    "SELECT * FROM employees WHERE emp_id = $1 AND password = $2",
    [empId, password]
  );
  return result.rows[0];
}

async function updateEmployeeName(empId, name) {
  const result = await db.query(
    `UPDATE employees
     SET emp_name = $1
     WHERE emp_id = $2
     RETURNING emp_id, emp_name, emp_email`,
    [name, empId]
  );
  return result.rows[0];
}

async function updateEmployeePhoto(empId, photoBuffer) {
  const result = await db.query(
    `UPDATE employees
     SET profile_photo = $1
     WHERE emp_id = $2
     RETURNING emp_id, emp_name, emp_email, profile_photo`,
    [photoBuffer, empId]
  );
  return result.rows[0];
}

module.exports = { findEmployeeByCredentials, updateEmployeeName, updateEmployeePhoto };

