// src/index.ts
import 'dotenv/config'; // Memuat variabel .env
import express, { Application } from 'express';
import cors from 'cors';

import appRoutes from './routes/app-routes';
import prisma from './lib/prisma'; // Import prisma untuk inisialisasi

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', appRoutes);

app.get('/', (req, res) => {
    res.send('Task Manager API running successfully.');
});

// Server Start
async function main() {
    try {
        // Cek koneksi DB sebelum memulai server
        await prisma.$connect(); 
        console.log("Database connected successfully.");
        
        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
            console.log(`API Base: http://localhost:${PORT}/api`);
        });
    } catch (e) {
        console.error("Failed to connect to database or start server:", e);
        process.exit(1);
    }
}

main();