export interface TestCategory {
    id: number;
    nameRus: string;
    nameKaz: string;
    allowMultipleAttempts: boolean;
}

export const TEST_CATEGORIES: TestCategory[] = [
    {
        "id": 8,
        "nameRus": "СФМ – субъекты финмониторинга",
        "nameKaz": "ҚМС – қаржылық мониторинг субъектілері",
        "allowMultipleAttempts": true
    },
    {
        "id": 6,
        "nameRus": "Школьник",
        "nameKaz": "Оқушылар",
        "allowMultipleAttempts": true
    },
    {
        "id": 7,
        "nameRus": "Взрослый, Студент",
        "nameKaz": "Ересек, студент",
        "allowMultipleAttempts": true
    }
];
