import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FeedBacks from './FeedBacks';

const theme = createTheme();

const mockFeedBacks = [
  {
    user: {
      firstname: 'Дулат',
      lastname: 'Адембаев',
      patronymic: 'Октябрханович'
    },
    comment: 'Очень хорошая подача, справочные материалы легко читаемые, особенно понравились короткие 2х минутные ролики, а также развернутая информация про ФАТФ'
  },
  {
    user: {
      firstname: 'Айгерим',
      lastname: 'Авганова',
      patronymic: 'Оразовна'
    },
    comment: 'курс для новичков необходим, только прошу отключить авто перевод. Хотелось бы на базе курса видеть свои ошибки и была возможность курса устранить их.'
  },
  {
    user: {
      firstname: 'Саят',
      lastname: 'Какиманов',
      patronymic: 'ыкласович'
    },
    comment: 'Спасибо за предоставленное обучение'
  },
  {
    user: {
      firstname: 'Тест',
      lastname: 'Пользователь',
      patronymic: 'Тестович'
    },
    comment: 'Дополнительный отзыв для тестирования пагинации'
  }
];

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('FeedBacks Component', () => {
  test('renders without crashing', () => {
    renderWithTheme(<FeedBacks feedBacks={[]} />);
    expect(screen.getByText('Нет отзывов')).toBeInTheDocument();
  });

  test('displays feedback cards', () => {
    renderWithTheme(<FeedBacks feedBacks={mockFeedBacks} />);
    expect(screen.getByText('Дулат Адембаев')).toBeInTheDocument();
    expect(screen.getByText(/Очень хорошая подача/)).toBeInTheDocument();
  });

  test('shows pagination when there are more than 3 feedbacks', async () => {
    renderWithTheme(<FeedBacks feedBacks={mockFeedBacks} />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Следующая страница')).toBeInTheDocument();
      expect(screen.getByLabelText('Предыдущая страница')).toBeInTheDocument();
    });
  });

  test('navigation works correctly', async () => {
    renderWithTheme(<FeedBacks feedBacks={mockFeedBacks} />);
    
    const nextButton = screen.getByLabelText('Следующая страница');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Тест Пользователь')).toBeInTheDocument();
    });
  });

  test('keyboard navigation works', async () => {
    renderWithTheme(<FeedBacks feedBacks={mockFeedBacks} />);
    
    const carousel = screen.getByRole('region');
    carousel.focus();
    
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    
    await waitFor(() => {
      expect(screen.getByText('Тест Пользователь')).toBeInTheDocument();
    });
  });

  test('autoplay toggle works', async () => {
    renderWithTheme(<FeedBacks feedBacks={mockFeedBacks} />);
    
    const playPauseButton = screen.getByLabelText(/автопрокрутку/);
    fireEvent.click(playPauseButton);
    
    expect(screen.getByLabelText('Запустить автопрокрутку')).toBeInTheDocument();
  });

  test('responsive design - mobile view', () => {
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480,
    });

    renderWithTheme(<FeedBacks feedBacks={mockFeedBacks} />);
    
    // На мобильных устройствах должна отображаться только одна карточка
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(1);
  });

  test('accessibility attributes are present', () => {
    renderWithTheme(<FeedBacks feedBacks={mockFeedBacks} />);
    
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Отзывы студентов');
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  test('handles empty user data gracefully', () => {
    const feedbackWithoutUser = [
      {
        user: null,
        comment: 'Анонимный отзыв'
      }
    ];
    
    renderWithTheme(<FeedBacks feedBacks={feedbackWithoutUser} />);
    expect(screen.getByText('Анонимный пользователь')).toBeInTheDocument();
    expect(screen.getByText('Анонимный отзыв')).toBeInTheDocument();
  });
});

export default {};
