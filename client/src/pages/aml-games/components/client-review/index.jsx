import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import NameList from '../name-list';
import RisksComponent from '../risks-component';
import SubmissionButton from '../sub-button';
import './style.css';

const ClientReview = ({ clients, namelist = true, handleSubmit }) => {
    const [currentClientIndex, setCurrentClientIndex] = useState(0);

    // Инициализируем состояние для хранения значений переключателей и выбранного риска для каждого клиента
    const initialSwitchStates = clients.map(() => false);
    const [switchStates, setSwitchStates] = useState(initialSwitchStates);
    const [selectedRisk, setSelectedRisk] = useState(clients.map(() => null)); // Сохраняем выбранные риски для всех клиентов

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

    const nextClient = () => {
        if (currentClientIndex < clients?.length - 1) {
            setCurrentClientIndex(currentClientIndex + 1);
        }
    };

    const prevClient = () => {
        if (currentClientIndex > 0) {
            setCurrentClientIndex(currentClientIndex - 1);
        }
    };

    const handleSwitchChange = (index, value) => {
        const newSwitchStates = [...switchStates];
        newSwitchStates[index] = value;
        setSwitchStates(newSwitchStates);
    };

    const handleRiskChange = (index, risk) => {
        const newSelectedRisk = [...selectedRisk];
        newSelectedRisk[index] = risk;
        setSelectedRisk(newSelectedRisk);
    };

    const calculateResult = () => {
        let correctCount = 0;

        switchStates.forEach((state, index) => {
            if (state === clients[index].shouldBeSwitched) {
                correctCount++;
            }
        });

        const result = correctCount / clients?.length;
        handleSubmit("tagged answers", result);
        handleNextTask()
        console.log(result); // Вывод результата в консоль
    };

    const calculateRiskResult = () => {
        let correctCount = 0;

        selectedRisk.forEach((risk, index) => {
            if (risk === clients[index].correctRisk) {
                correctCount++;
            }
        });

        const result = correctCount / clients?.length;
        handleSubmit("risk answers", result);
        handleNextTask()
        console.log(result); // Вывод результата в консоль
    };
    const handling = () => {
        return namelist ? calculateResult() : calculateRiskResult();
    }

    const { description, img, fullName } = clients[currentClientIndex];

    return (
        <div style={{width: "100%", display: "flex", justifyContent: "center", flexDirection:'column'}}>
            <div className="client-review-container">
                <div className="client-review-res">
                    <div className='client-review-description-container'>
                        {
                            typeof description === 'string' ?
                                <p className='client-review-description'> {description}</p> : description
                        }
                        {
                            namelist ?
                                <div className="client-review-buttons">
                                    <NameList
                                        peopleData={[{
                                            name: fullName,
                                            id: ''
                                        }]}
                                        switchState={switchStates[currentClientIndex]}
                                        onSwitchChange={(value) => handleSwitchChange(currentClientIndex, value)}
                                        clientReview={true}
                                    />
                                </div> :
                                <RisksComponent
                                    selectedRisk={selectedRisk[currentClientIndex]}
                                    setSelectedRisk={(risk) => handleRiskChange(currentClientIndex, risk)}
                                />
                        }
                    </div>
                    <div className='fullInfo-client'>
                        <h3>Клиент {currentClientIndex + 1}:</h3>
                        <div className='img-container-review'>
                            <img src={img} alt={fullName}/>
                        </div>
                        <p>{fullName}</p>
                    </div>
                </div>

                <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", width:'90%', marginTop:'20px'}}>
                    <div className="client-review-stepper">
                        {clients.map((_, index) => (
                            <span
                                key={index}
                                className={index === currentClientIndex ? 'active' : ''}
                            ></span>
                        ))}
                    </div>
                    <div className="client-review-navigation">
                        <button className='client-review-navigation-previous' onClick={prevClient}
                                disabled={currentClientIndex === 0}>Назад
                        </button>
                        <button className='client-review-navigation-next' onClick={nextClient}
                                disabled={currentClientIndex === clients?.length - 1}>Далее
                        </button>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "right", marginRight: "50px", marginTop: "30px"}}>
                <SubmissionButton handling={handling}/>
            </div>
        </div>
    );
};

export default ClientReview;
