import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockEvents } from './mockData';

const setupMock = () => {
    const mock = new MockAdapter(axios, { delayResponse: 500 });

    mock.onGet('/api/events').reply(200, mockEvents);
};

export default setupMock;
