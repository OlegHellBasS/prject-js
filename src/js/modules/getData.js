//Функція для отримання даних з вказаного URL
 const getData = async (url) => {
  try {
      // Виконання HTTP запиту за вказаним URL
      const response = await fetch(url);

      // Перевірка статусу відповіді на HTTP запит
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Повернення результату у форматі JSON
      return await response.json();
  } catch (error) {
      // Обробка помилки при отриманні даних
      throw new Error('Failed to get data');
  }
};
