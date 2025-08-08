const express = require('express');
const cors = require("cors");
const { findEmployeeByCredentials, updateEmployeeName, updateEmployeePhoto } = require("./models/Employee");
const multer = require("multer");
const db = require("./config/db");
const app = express();
const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Multer setup for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/login/employee", async (req, res) => {
  const { empId, password } = req.body;

  try {
    const employee = await findEmployeeByCredentials(empId, password);

    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: employee });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update name
app.put("/api/employee/name", async (req, res) => {
  const { empId, name } = req.body;
  try {
    const updated = await updateEmployeeName(empId, name);
    res.json({ message: "Name updated", user: updated });
  } catch (err) {
    console.error("Error updating name:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update photo
app.put("/api/employee/photo", upload.single("photo"), async (req, res) => {
  const { empId } = req.body;
  const photoBuffer = req.file ? req.file.buffer : null;

  try {
    const updated = await updateEmployeePhoto(empId, photoBuffer);
    res.json({ message: "Photo updated", user: updated });
  } catch (err) {
    console.error("Error updating photo:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Optional: Serve profile photo

app.get("/api/employee/:id/photo", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT profile_photo FROM employees WHERE emp_id = $1",
      [id]
    );

    if (result.rows.length && result.rows[0].profile_photo) {
      res.set("Content-Type", "image/jpeg"); // Or image/png depending on your stored data
      res.send(result.rows[0].profile_photo);
    } else {
      res.status(404).send("No photo found");
    }
  } catch (err) {
    console.error("Error fetching photo:", err);
    res.status(500).send("Internal server error");
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
