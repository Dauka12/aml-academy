// Test script to verify backslash removal

// Test text with trailing backslashes
const testText = `Оценивая технологию блокчейн, рассматривайте смарт-контракты как важное блокчейн-приложение, устанавливающее правила контракта в коде, который автоматически выполняется при наступлении определенных событий. \\

Смарт-контракты - это просто программы, хранящиеся в блокчейне, которые запускаются при выполнении заранее определенных условий. \\

Эта идея была предложена в 1990-х годах Ником Сабо, пионером современной информатики, который определил их как набор виртуальных обещаний с соответствующими протоколами для их выполнения.\\

Смарт-контракты предоставляют ряд преимуществ участвующим сторонам:\\`;

console.log('Original text:');
console.log(testText);

// Test with ComponentRenderer helper functions
const cleanAndFormatText = (text) => {
    if (!text) return '';
    if (typeof text !== 'string') {
        return String(text);
    }
    const cleaned = text
        .replace(/"/g, '')
        .replace(/\\\s*$/gm, '')  // Remove trailing backslashes at end of lines
        .replace(/\\$/gm, '')     // Remove single trailing backslashes
        .trim();
    return cleaned;
};

console.log('\nCleaned with ComponentRenderer helper:');
console.log(cleanAndFormatText(testText));

// Show the difference
console.log('\n=== COMPARISON ===');
console.log('Before cleaning - lines ending with backslash:');
const beforeLines = testText.split('\n');
beforeLines.forEach((line, index) => {
    if (line.endsWith('\\')) {
        console.log(`Line ${index + 1}: "${line}"`);
    }
});

console.log('\nAfter cleaning - no trailing backslashes:');
const afterLines = cleanAndFormatText(testText).split('\n');
afterLines.forEach((line, index) => {
    console.log(`Line ${index + 1}: "${line}"`);
});
