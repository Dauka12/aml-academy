import { createRoot } from 'react-dom/client';
import ShortBiography from './components/courseTemplates/complex/images/ShortBiography';

// Sample data from backend
const sampleData = {
    "component_entry_id": 269221,
    "componentName": "ShortBiography",
    "values": {
        "component_entry_values_id": 269220,
        "values": {
            "name": "\"Краткая история блокчейна\"",
            "img": "\"https://amlacademy.kz/aml/214a78fd-6260-49d7-929d-5abdfefa2ae7\"",
            "biography": "\"Первая модель блокчейна была создана в начале 1990-х годов, когда специалист по информатике Стюарт Хабер и физик У. Скотт Сторнетта решили использовать криптографию в цепочке блоков для защиты цифровых документов от фальсификации.\\nХабер и Сторнетта вдохновили многих программистов и любителей криптографии, что в конечном итоге привело к созданию Биткоина — первой криптовалюты на основе технологии блокчейна. С тех пор популярность блокчейна значительно выросла, а криптовалюты получили глобальное распространение.\\nТехнология блокчейна обычно используется для записи криптовалютных транзакций, но она также подходит для записи других видов цифровых данных и может выполнять множество задач.\\n\""
        }
    }
};

function TestComponent() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">ShortBiography Component Test</h1>
      
      <ShortBiography
        img={sampleData.values.values.img}
        name={sampleData.values.values.name}
        biography={sampleData.values.values.biography}
        backgroundColor="#f0f4f8"
      />
      
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">With Custom Colors</h2>
        <ShortBiography
          img={sampleData.values.values.img}
          name={sampleData.values.values.name}
          biography={sampleData.values.values.biography}
          backgroundColor="#1a365d"
          color="#ffffff"
          secondaryColor="#a0aec0"
        />
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<TestComponent />);
