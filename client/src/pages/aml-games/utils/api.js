// src/utils/api.js

export const sendAnswerToBackend = async (levelId, subLevelId, taskId, answer, isCorrect) => {
    try {
        console.log("levelId: "+ levelId+ "sublevelId: "+ subLevelId + " taskId: " + taskId + " answer: " + answer, " isCorrect: "+isCorrect);
        
        // const response = await fetch('/api/submit-answer', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ pageId, taskId, answer, isCorrect }),
        // });

        // if (!response.ok) {
        //     throw new Error('Ошибка при отправке ответа на сервер');
        // }

        // const result = await response.json();
        // console.log('Ответ успешно отправлен:', result);
        // return result;
    } catch (error) {
        console.error('Ошибка:', error);
    }
};
