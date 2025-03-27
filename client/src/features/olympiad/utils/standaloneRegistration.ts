import axios from 'axios';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

// Configuration
const BASE_URL = 'http://localhost:8444'; // Change to 'https://amlacademy.kz' for production
const EXCEL_FILE_PATH = './students.xlsx';
const BATCH_SIZE = 5;
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAwMDAwMDAwMDAiLCJpYXQiOjE3NDMwNjg5ODcsImV4cCI6MTc0MzY3Mzc4N30.ZKAcoPNHj71VJsjczDc2E83a89ta65NMpHun3dxderU'; // ADD YOUR TOKEN HERE - get it from browser's localStorage or login first

// Create axios instance with authentication
const api = axios.create({
    baseURL: `${BASE_URL}/api/olympiad`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : ''
    }
});

// Define interfaces
interface TestCategory {
    id: number;
    nameRus: string;
    nameKaz: string;
}

interface CategoryMap {
    [key: string]: number;
}

interface RegistrationError {
    student: string;
    error: string;
}

interface StudentData {
    firstname: string;
    lastname: string;
    middlename: string;
    iin: string;
    phone: string;
    university: string;
    email: string;
    password: string;
    categoryId: number;
    studyYear: number;
}

// API functions
async function getAllCategories(): Promise<TestCategory[]> {
    try {
        // First check if we have cached categories to avoid API call
        if (fs.existsSync('./categories.json')) {
            console.log('Using cached categories...');
            const data = fs.readFileSync('./categories.json', 'utf8');
            return JSON.parse(data);
        }

        console.log('Fetching categories from API...');
        const response = await api.get<TestCategory[]>('/exam/all-categories');
        
        // Cache the categories for future runs
        fs.writeFileSync('./categories.json', JSON.stringify(response.data, null, 2));
        
        return response.data;
    } catch (error: any) {
        console.error('Error fetching categories:', error.response?.data || error.message);
        throw new Error('Failed to fetch categories');
    }
}

async function registerStudent(studentData: StudentData): Promise<any> {
    try {
        const response = await api.post('/auth/register', studentData);
        return response.data;
    } catch (error: any) {
        const errorMsg = error.response?.data?.message || 'Registration failed';
        throw new Error(errorMsg);
    }
}

// Manual login function to get token if needed
async function login(email: string, password: string): Promise<string> {
    try {
        const response = await axios.post(`${BASE_URL}/api/olympiad/auth/login`, {
            email,
            password
        });
        return response.data.token;
    } catch (error: any) {
        throw new Error('Login failed: ' + (error.response?.data?.message || error.message));
    }
}

// Main registration function
async function runRegistration() {
    console.log('Starting bulk registration process...');

    try {
        // Check if we have a token
        if (!AUTH_TOKEN) {
            console.log('No authentication token provided!');
            console.log('You need to set the AUTH_TOKEN variable in the script.');
            console.log('Get it from your browser localStorage or login first.');
            return;
        }

        // 1. Read Excel file
        console.log(`Reading Excel file from ${EXCEL_FILE_PATH}...`);
        if (!fs.existsSync(EXCEL_FILE_PATH)) {
            console.error(`File not found: ${EXCEL_FILE_PATH}`);
            return;
        }

        const workbook = XLSX.readFile(EXCEL_FILE_PATH);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const students = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Found ${students.length} students to register`);

        // 2. Get categories
        console.log('Fetching categories...');
        
        // For hardcoded categories if API fails
        let categories: TestCategory[] = [];
        try {
            categories = await getAllCategories();
        } catch (error) {
            console.log('Failed to fetch categories, using hardcoded values...');
            categories = [
                { id: 1, nameRus: "Юриспруденция", nameKaz: "Юриспруденция" },
                { id: 2, nameRus: "Экономика", nameKaz: "Экономика" },
                { id: 3, nameRus: "Халықаралық қатынастар", nameKaz: "Международные отношения" },
                { id: 4, nameRus: "Ақпараттық қауіпсіздік", nameKaz: "Информационная безопасность" }
            ];
        }

        const categoryMap: CategoryMap = {};
        categories.forEach(cat => {
            categoryMap[cat.nameRus] = cat.id;
            categoryMap[cat.nameKaz] = cat.id;
        });

        console.log('Category mapping:', categoryMap);

        // 3. Process students in batches
        let successful = 0;
        let failed = 0;
        const errors: RegistrationError[] = [];

        for (let i = 0; i < students.length; i += BATCH_SIZE) {
            const batch = students.slice(i, i + BATCH_SIZE);
            console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(students.length / BATCH_SIZE)}`);

            const promises = batch.map(async (student: any, index: number) => {
                try {
                    // Parse study year
                    const yearText = String(student['Укажите год обучения'] || '1');
                    const yearMatch = /^(\d+)/.exec(yearText);
                    const studyYear = yearMatch && yearMatch[1] ? parseInt(yearMatch[1], 10) : 1;

                    // Get category ID
                    const categoryName = String(student['Категория'] || '');
                    const categoryId = categoryMap[categoryName];

                    if (!categoryId) {
                        throw new Error(`Unknown category: "${categoryName}"`);
                    }

                    // Prepare student data
                    const studentData: StudentData = {
                        firstname: String(student['Имя'] || ''),
                        lastname: String(student['Фамилия'] || ''),
                        middlename: String(student['Отчество'] || ''),
                        iin: String(student['ИИН'] || '').replace(/\s/g, ''),
                        phone: String(student['Номер телефона'] || '').replace(/\s/g, ''),
                        university: String(student['Университет в котором обучаетесь'] || ''),
                        email: String(student['Электронная почта'] || '').trim(),
                        password: String(student['Пароль которую будете использовать при прохождении тестирования'] || ''),
                        categoryId,
                        studyYear
                    };

                    // Validate required fields
                    if (!studentData.firstname) throw new Error('Missing firstname');
                    if (!studentData.lastname) throw new Error('Missing lastname');
                    if (!studentData.iin) throw new Error('Missing IIN');
                    if (!studentData.email) throw new Error('Missing email');
                    if (!studentData.password) throw new Error('Missing password');

                    // Register student
                    await registerStudent(studentData);
                    successful++;
                    console.log(`✓ Successfully registered: ${studentData.lastname} ${studentData.firstname}`);

                } catch (error) {
                    failed++;
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    const studentName = `${String(student['Фамилия'] || '')} ${String(student['Имя'] || '')}`;
                    errors.push({ student: studentName, error: errorMessage });
                    console.error(`✗ Failed to register: ${studentName} - ${errorMessage}`);
                }
            });

            await Promise.all(promises);
            
            // Add delay between batches to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // 4. Print results
        console.log('\n===== REGISTRATION RESULTS =====');
        console.log(`Total students: ${students.length}`);
        console.log(`Successfully registered: ${successful}`);
        console.log(`Failed: ${failed}`);

        if (errors.length > 0) {
            console.log('\nErrors:');
            errors.forEach((err, idx) => {
                console.log(`${idx + 1}. ${err.student}: ${err.error}`);
            });

            // Save errors to file for review
            fs.writeFileSync(
                './registration_errors.json', 
                JSON.stringify(errors, null, 2)
            );
            console.log('Errors saved to registration_errors.json');
        }

    } catch (error) {
        console.error('Bulk registration failed:', error);
    }
}

// Execute the script
runRegistration();