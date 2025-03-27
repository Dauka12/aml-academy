import * as XLSX from 'xlsx';
import { registerStudent } from '../api/authApi';
import { getAllCategories } from '../api/examApi';

/**
 * A simple script for one-time bulk registration of students from Excel
 * 
 * Usage: 
 * 1. Save your Excel file in the project directory
 * 2. Update the FILE_PATH constant below with your file path
 * 3. Run this script with: ts-node runBulkRegistration.ts
 */

// Configuration
const FILE_PATH = './students.xlsx';
const BATCH_SIZE = 5; // Process 5 students at a time to avoid overwhelming the server

// Define interfaces to fix type errors
interface CategoryMap {
    [key: string]: number;
}

interface RegistrationError {
    student: string;
    error: string;
}

// Run the script
async function runBulkRegistration() {
    console.log('Starting bulk registration process...');

    try {
        // 1. Read Excel file
        console.log(`Reading Excel file from ${FILE_PATH}...`);
        const workbook = XLSX.readFile(FILE_PATH);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const students = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Found ${students.length} students to register`);

        // 2. Get categories for mapping
        console.log('Fetching categories...');
        const categories = await getAllCategories();
        const categoryMap: CategoryMap = {};
        categories.forEach(cat => {
            categoryMap[cat.nameRus] = cat.id;
            categoryMap[cat.nameKaz] = cat.id;
        });

        // 3. Process in batches
        let successful = 0;
        let failed = 0;
        const errors: RegistrationError[] = [];

        for (let i = 0; i < students.length; i += BATCH_SIZE) {
            const batch = students.slice(i, i + BATCH_SIZE);
            console.log(`Processing batch ${i / BATCH_SIZE + 1}/${Math.ceil(students.length / BATCH_SIZE)}`);

            // Process each student in the batch
            const promises = batch.map(async (student: any, index: number) => {
                try {
                    const rowIndex = i + index;

                    // Extract study year from format like "2 год(курс)"
                    const yearMatch = /^(\d+)/.exec(student['Укажите год обучения']?.toString() || '1');
                    const studyYear = yearMatch && yearMatch[1] ? parseInt(yearMatch[1], 10) : 1;

                    // Get category ID
                    const categoryName = student['Категория'] as string;
                    const categoryId = categoryMap[categoryName];

                    if (!categoryId) {
                        throw new Error(`Unknown category: ${categoryName}`);
                    }

                    // Prepare student data
                    const studentData = {
                        firstname: student['Имя'] as string,
                        lastname: student['Фамилия'] as string,
                        middlename: (student['Отчество'] as string) || '',
                        iin: (student['ИИН'] as string)?.toString().replace(/\s/g, ''),
                        phone: (student['Номер телефона'] as string)?.toString().replace(/\s/g, ''),
                        university: student['Университет в котором обучаетесь'] as string,
                        email: (student['Электронная почта'] as string)?.toString().trim(),
                        password: student['Пароль которую будете использовать при прохождении тестирования'] as string,
                        categoryId,
                        studyYear
                    };

                    // Register student
                    await registerStudent(studentData);
                    successful++;
                    console.log(`✓ Successfully registered student: ${studentData.lastname} ${studentData.firstname}`);

                } catch (error) {
                    failed++;
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    errors.push({
                        student: `${(student['Фамилия'] as string)} ${(student['Имя'] as string)}`,
                        error: errorMessage
                    });
                    console.error(`✗ Failed to register student: ${(student['Фамилия'] as string)} ${(student['Имя'] as string)} - ${errorMessage}`);
                }
            });

            // Wait for all registrations in the batch to complete before moving to the next batch
            await Promise.all(promises);

            // Optional: Add a small delay to avoid rate limiting
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
        }

    } catch (error) {
        console.error('Bulk registration failed:', error);
    }
}

// Execute the script
runBulkRegistration();