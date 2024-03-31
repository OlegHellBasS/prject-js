window.addEventListener('DOMContentLoaded',()=>{
    const tabs = () => {
        // Отримуємо всі вкладки та посилання
        const tabs = document.querySelectorAll('section[data-index]');
        const link = document.querySelectorAll('a[data-index]');
        const linkWrap = document.querySelector('.header__nav');
        
        // Функція для приховування всіх вкладок та зняття активного класу з посилань
        const hideTabs = () => {
            tabs.forEach(item => {
                item.style.display = 'none';
            });
    
            link.forEach(item => {
                item.classList.remove('header__linck-active');
            });
        }
    
        // Функція для показу вкладки за індексом та додавання активного класу до посилання
        const showTabs = (index = 0) => {
            if (index >= 0 && index < tabs.length) { // Перевірка на коректність індексу
                tabs[index].style.display = 'block';
                link[index].classList.add('header__linck-active');
            }
        }
    
        // Початкове приховання всіх вкладок та показ першої
        hideTabs();
        showTabs();
    
        // Обробник кліків на посиланнях
        linkWrap.addEventListener('click', (event) => {
            const target = event.target;
    
            if (target && target.classList.contains('header__linck')) {
                event.preventDefault();
                const index = target.getAttribute('data-index');
                hideTabs(); //приховання всіх вкладок
                showTabs(index); // Показуємо відповідну вкладку
            }
        });
    }
    
    tabs();

    /**
 * Клас для створення користувачів та їх рендерингу на сторінці.
 */
class Users {
    constructor(src, alt, id, name, parentSelector) {
        this.src = src; 
        this.alt = alt; 
        this.id = id; 
        this.name = name; 
        this.parentElement = document.querySelector(parentSelector); // Батьківський елемент, де буде розміщено користувача
    }

    /**
     * Метод для рендерингу користувача на сторінці.
     */
    render() {
        const elementUser = document.createElement('div');
        elementUser.classList.add('user');

        // Створення HTML-структури для користувача
        elementUser.innerHTML += `
            <div class="user__img">
                <img src=${this.src} alt=${this.alt} />
            </div>
            <div class="user__desc">
                <a href="#" data-id=${this.id}>${this.id} ${this.name}</a>
            </div>
        `;

        // Додавання користувача до батьківського елементу
        this.parentElement.appendChild(elementUser);
    }
}

// Функція для отримання даних та рендерингу карточок користувачів.
 const cards = async (url, parentSelector) => {
    const modal = document.createElement('div');
    const modalInfo = document.createElement('div');
    const parentElement = document.querySelector(parentSelector);

    try {
        // Додавання класів та тексту до модального вікна
        modal.classList.add('modal');
        modalInfo.innerText = 'Завантаження...';

        // Додавання тексту процесу завантаження до модального вікна
        modal.appendChild(modalInfo);
        parentElement.appendChild(modal);

        // Отримання даних про користувачів
        const data = await getData(url); 

        // Рендеринг карточок користувачів з отриманих даних
        data.forEach(({ id, name }, index) => {
            new Users(photoArray[index], name, id, name, parentSelector).render();
        });

        // Додавання обробника подій для карточок користувачів
        parentElement.addEventListener('click', (event) => {
            const target = event.target;
            const userId = target.getAttribute('data-id');
            if (target && userId) {
                event.preventDefault();
                location.href = `user-details.html?id=${userId}`;
            }
        });
    } catch {
        // Обробка помилки під час отримання даних
        modalInfo.innerText = 'Щось пішло не так';
    } finally {
        // Видалення модального вікна після завершення операції
        setTimeout(() => {
            modal.remove();
        }, 100);
    }
};

    cards('https://jsonplaceholder.typicode.com/users','.users__row')
})