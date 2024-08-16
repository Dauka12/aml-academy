const testText = 'Вы направили уведомление, в результате получили талон. Следующим этапом необходимо принять на работу ответственного сотрудника по ПОД/ФТ, который будет внедрять и реализовывать политику ПОД/ФТ в вашей организации. Вам предстоит провести собеседование с кандидатами и выбрать наиболее подходящего работника. Учтите их образование, опыт работы и навыки для принятия правильного решения.';
const task_1_1_1_desk = <><p>1.Подать соответствующее Уведомление и получить Талон.</p><br /><p>2.Разместить Талон в личном кабинете Портала ВЕБ-СФМ АФМ</p><br /><p>3.В случае изменения юридического адреса ФЛ, места нахождения ЮЛ, адреса осуществления деятельности/действий, указанных в Уведомлении, а также регистрационных данных – СФМ обязан в течение 10 рабочих дней со дня изменения направить Уведомление об указанных изменениях.</p></>
const task_1_1_1_steps = <><p>1. Заполнить форму Уведомления на портале <a style={{ color: "white" }} href="https://elicense.kz/">https://elicense.kz/</a></p><br /><p>2.    Скачать Талон с портала <a style={{ color: "white" }} href="https://elicense.kz/">https://elicense.kz/</a></p><br /><p>3. Пройти регистрацию на Портале ВЕБ-СФМ и разместить Талон в личном кабинете.</p></>
const task_1_1_1_risk = <><p>1. Занятие предпринимательской или иной деятельностью, а также осуществление действий/операций без направления Уведомления в случаях, когда направление Уведомления обязательны, если действия не содержат признаков уголовного наказуемого деяния влекут:</p> <br/> <p>Штраф на ФЛ – 15 МРП;</p><p>На должностных лиц субъектов малого предпринимательства /НКО – 25 МРП;</p><p>На субъектов среднего предпринимательства – 40 МРП;</p><p>На субъектов крупного предпринимательства – 50 МРП;</p><p>За повторное совершение в течение года после наложения административного взыскания:</p><p>Штраф на ФЛ – 30 МРП;</p><p>На должностных лиц субъектов малого предпринимательства /НКО – 50 МРП;</p><p>На субъектов среднего предпринимательства – 80 МРП;</p><p>На субъектов крупного предпринимательства – 500 МРП.</p><br/><p>2. Участие в преступных схемах ОД/ФТ/ФРОМУ.</p></>
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
                description: task_1_1_1_desk,
                goal: task_1_1_1_steps,
                steps: task_1_1_1_steps,
                risk: task_1_1_1_risk
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
                name: 'Задание 2.5.1',
                description: testText,
                goal: testText,
                steps: testText,
                risk: testText
            }
        ]
    },
    {
        level: 3,
        subLevel: 1,
        taskCount: 1,
        name:'Надлежащая проверка клиента',
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
        level: 4,
        subLevel: 1,
        taskCount: 1,
        name:'Мониторинг операции',
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