const db = require('../config/db.js');

const getAllPatients = async (req, res) => {
    try {
        let query = 'SELECT * FROM patients';

        const [rows] = await db.query(query);
        res.json(rows);
    }catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//create new patient


const createPatient = async (req, res) => {
    try {
        const { name, age, gender, contact } = req.body;

        // basic validation
        if (!name || !age || !gender || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const query = `
            INSERT INTO patients (name, age, gender, contact)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [name, age, gender, contact]);

        res.status(201).json({
            message: 'Patient created successfully',
            patientId: result.insertId
        });

    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllPatients,
    createPatient
};


