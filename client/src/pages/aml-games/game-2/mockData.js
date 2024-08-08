const testText = 'Вы направили уведомление, в результате получили талон. Следующим этапом необходимо принять на работу ответственного сотрудника по ПОД/ФТ, который будет внедрять и реализовывать политику ПОД/ФТ в вашей организации. Вам предстоит провести собеседование с кандидатами и выбрать наиболее подходящего работника. Учтите их образование, опыт работы и навыки для принятия правильного решения.';

export const mockTasks = [
    {
        level: 1,
        subLevel: 1,
        taskCount: 1,
        status: 'proccess',
        name: 'Подача уведомления СФМ',
        tasks: [
            {
                name: 'Задание 1.1.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 1,
        subLevel: 2,
        taskCount: 2,
        name: 'Определение ответственного лица по ПОД/ФТ',
        tasks: [
            {
                name: 'Задание 1.2.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
            {
                name: 'Задание 1.2.2',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 1,
        subLevel: 3,
        taskCount: 4,
        name: 'Регистрация в личном кабинете',
        tasks: [
            {
                name: 'Задание 1.3.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
            {
                name: 'Задание 1.3.2',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
            {
                name: 'Задание 1.3.3',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
            {
                name: 'Задание 1.3.4',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
        ]
    },
    {
        level: 1,
        subLevel: 4,
        taskCount: 1,
        name:'Формирование досье клиента',
        tasks: [
            {
                name: 'Задание 1.4.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 1,
        subLevel: 5,
        taskCount: 4,
        name: 'Разработка анкеты «Знай своего клиента»',
        tasks: [
            {
                name: 'Задание 1.5.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
            {
                name: 'Задание 1.5.2',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
            {
                name: 'Задание 1.5.3',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
            {
                name: 'Задание 1.5.4',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            },
        ]
    },
    {
        level: 2,
        subLevel: 1,
        taskCount: 1,
        name:'Оценка риска в зависимости от типа клиента',
        tasks: [
            {
                name: 'Задание 2.1.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 1,
        taskCount: 2,
        tasks: [
            {
                name: 'Задание 2.1.2',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 2,
        taskCount: 1,
        name:'Оценка странового риска',
        tasks: [
            {
                name: 'Задание 2.2.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 2,
        taskCount: 2,
        tasks: [
            {
                name: 'Задание 2.2.2',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 3,
        taskCount: 1,
        name:'Оценка риска услуги и продукта',
        tasks: [
            {
                name: 'Задание 2.3.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 3,
        taskCount: 2,
        tasks: [
            {
                name: 'Задание 2.3.2',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 4,
        taskCount: 1,
        name:'Оценка риска способа предоставления услуги',
        tasks: [
            {
                name: 'Задание 2.4.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 4,
        taskCount: 2,
        tasks: [
            {
                name: 'Задание 2.4.2',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 2,
        subLevel: 5,
        taskCount: 1,
        name:'Оценка риска способа предоставления услуги',
        tasks: [
            {
                name: 'Задание 2.4.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
]