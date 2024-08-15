// src/utils/api.js
import axios from 'axios';
import base_url from '../../../settings/base_url';
export const sendAnswerToBackend = async (levelId, subLevelId, taskId, answer, isCorrect) => {
    try {
        console.log("levelId: " + levelId + " sublevelId: " + subLevelId + " taskId: " + taskId + " answer: " + answer + typeof answer, " isCorrect: " + isCorrect);
        const token = localStorage.getItem("jwtToken")
        
        const response = await axios.post(`${base_url}/api/aml/game/checkAnswer`,
            {
                'taskId': taskId,
                'levelId': levelId,
                'subLevelId': subLevelId,
                'isCorrect': isCorrect
            },
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправке ответа на сервер');
        }

        const result = await response.json();
        console.log('Ответ успешно отправлен:', result);
        return result;
    } catch (error) {
        console.error('Ошибка:', error);
    }
};
