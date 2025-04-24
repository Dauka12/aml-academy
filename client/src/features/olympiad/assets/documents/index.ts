// Import the document files
import instructionDoc from '../files/Инструкция_Олимпиада.docx';
import regulationDoc from '../files/Регламент_Эссе.docx';
import ibResultsDoc from '../files/Результаты_по_ИБ.pdf';
import moResultsDoc from '../files/Результаты_по_МО.pdf';
import ecResultsDoc from '../files/Результаты_по_Эк.pdf';
import lawResultsDoc from '../files/Результаты_по_Юр.pdf';

// Export the file mapping
export const documentFiles = {
  'Юриспруденция_Инструкция': instructionDoc,
  'Регламент_Эссе': regulationDoc,
  'Положение': null, // Add actual file when available
  'Эссе': null, // Add actual file when available
  'Результаты_по_Юр': lawResultsDoc,
  'Результаты_по_ИБ': ibResultsDoc,
  'Результаты_по_МО': moResultsDoc,
  'Результаты_по_Эк': ecResultsDoc
};

// Add type for the mapping
export type DocumentKey = keyof typeof documentFiles;
