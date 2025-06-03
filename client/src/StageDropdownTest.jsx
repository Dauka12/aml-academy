import StageDropDown from './components/courseTemplates/complex/StageDropDown';

const StageDropdownTest = () => {
    // Test data for StageDropDown component  
    const testStages = [
        {
            icon: 'https://via.placeholder.com/50x50/4F46E5/FFFFFF?text=1', 
            text: 'Ст. 165 УК КазССР', 
            innerText: 'Использование денежных средств и иного имущества, приобретенных или добытых преступным путем, для занятия предпринимательской деятельностью или иной не запрещенной законом деятельностью'
        },
        {
            icon: 'https://via.placeholder.com/50x50/7C3AED/FFFFFF?text=2', 
            text: 'Ст. 193 УК РК', 
            innerText: 'Легализация денежных средств или иного имущества, приобретенного незаконным путем'
        },
        {
            icon: 'https://via.placeholder.com/50x50/EC4899/FFFFFF?text=3', 
            text: 'Ст. 218 УК РК', 
            innerText: 'Легализация (отмывание) денег и (или) иного имущества, полученных преступным путем'
        }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">StageDropDown Test</h1>
            
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-yellow-800">Fixed Issue:</h2>
                <p className="text-sm text-yellow-700">
                    <strong>StageDropDown:</strong> Fixed text duplication - modal header now shows "Подробнее" instead of repeating the main text.
                </p>
            </div>
            
            <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">StageDropDown Component</h2>
                <div className="bg-gray-50 p-4 rounded border">
                    <StageDropDown stages={testStages} version={1} />
                </div>
            </div>
            
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                    <strong>Test Instructions:</strong> Click the "+" button on any stage item. The modal should open with "Подробнее" in the header, not the same text as the main component.
                </p>
            </div>
        </div>
    );
};

export default StageDropdownTest;
