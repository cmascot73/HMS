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
        const { name, age, gender, ward, diagnosis } = req.body;
        
        const sql= `INSERT INTO patients (name, age, gender, ward, diagnosis) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, age, gender, ward, diagnosis];
        const [rows] = await db.query(sql, values);

        res.status(201).json({
            message: 'Patient created successfully',
            patientId: rows.insertId
        });

    } catch (error) {
        console.error('Error creating patient:', error);
   
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender, ward, diagnosis } = req.body;

        const sql = `
            UPDATE patients
            SET name = ?, age = ?, gender = ?, ward = ?, diagnosis = ?
            WHERE id = ?
        `;

        const values = [name, age, gender, ward, diagnosis, id];

        const [rows] = await db.query(sql, values);

        res.json({
            message: 'Patient updated successfully',
            patientId: id
        });
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;      
        const sql = 'DELETE FROM patients WHERE id = ?';
        const [rows] = await db.query(sql, [id]);   

        res.json({
            message: 'Patient deleted successfully',
            patientId: id
        });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllPatients,
    createPatient,
    updatePatient,
    deletePatient
};


