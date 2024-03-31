window.addEventListener('DOMContentLoaded', () => {
    const tabs = (wrapperLinckSelector, linckSelector, tabsSelector, classActive) => {
        // Знаходження необхідних елементів за селекторами
        const wrapperLinck = document.querySelector(wrapperLinckSelector);
        const lincks = document.querySelectorAll(linckSelector);
        const tabs = document.querySelectorAll(tabsSelector);

        // Функція для сховання всіх вкладок та зняття класу активності
        const hideTabs = () => {
            tabs.forEach(item => {
                item.style.display = 'none';
            });

            lincks.forEach(item => {
                item.classList.remove(classActive);
            });
        };

        // Функція для показу вкладки з вказаним індексом та додавання класу активності
        const showTabs = (index = 0) => {
            lincks[index].classList.add(classActive);
            tabs[index].style.display = 'block';
        };

        // Сховати всі вкладки та показати першу вкладку при завантаженні сторінки
        hideTabs();
        showTabs();

        // Обробник подій для кліку на елемент враппера вкладок
        wrapperLinck.addEventListener('click', (event) => {
            const target = event.target;
            // Перевірка, чи клікнутий елемент є вкладкою
            if (target && target.classList.contains(linckSelector.replace('.', ''))) {
                // Ітерація по всіх вкладках, щоб знайти відповідну
                lincks.forEach((item, index) => {
                    if (item === target) {
                        // Показати відповідну вкладку та сховати інші
                        hideTabs();
                        showTabs(index);
                    }
                });
            }
        });
    };

    class UsersDebitis {
        constructor(data, src, alt, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.id = data.id;
            this.name = data.name;
            this.username = data.username;
            this.email = data.email;
            this.street = data.address.street;
            this.suite = data.address.suite;
            this.city = data.address.city;
            this.zipcode = data.address.zipcode;
            this.lat = data.address.geo.lat;
            this.lng = data.address.geo.lng;
            this.companyName = data.company.name;
            this.catchPhrase = data.company.catchPhrase;
            this.bs = data.company.bs;
            this.phone = data.phone;
            this.website = data.website;
            this.parentElement = document.querySelector(parentSelector);
        }
        render() {
            const elementUser = document.createElement('div');
            elementUser.classList.add('container');

            elementUser.innerHTML += `
                <div class="details__row">
                    <div class="details__user">
                        <div class="details__img">
                            <img src=${this.src} alt=${this.alt} />
                            <div>Upload</div>
                        </div>
                        <div class="detais__name">${this.name}</div>
                        <div class="details__desc">${this.username}</div>
                    </div>
                    <div class="details__body">
                        <h2 class="details__title">About ${this.name}</h2>
                        <div class="details__desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
                            tempora fugit debitis officia? Est provident facilis sapiente
                            quisquam quae doloribus.
                        </div>
                        <ul class="detalis__nav">
                            <li class="detalis__link detalis__link-active">Contact info</li>
                            <li class="detalis__link">Additional info</li>
                        </ul>
                        <div class="detalis__address">
                            <div>Street: ${this.street}</div>
                            <div>Suite: ${this.suite}</div>
                            <div>City: ${this.suite}</div>
                            <div>Zipcode: ${this.zipcode}</div>
                            <div>Geo: lat ${this.lat} lng ${this.lng}</div>
                            <div>Phone: ${this.phone}</div>
                            <div>Website: ${this.website}</div>
                        </div>
                        <div class="detalis__address">
                            <div>Name: ${this.name}</div>
                            <div>User name: ${this.username}</div>
                            <div>Company</div>
                            <div>Name: ${this.companyName}</div>
                            <div>Catchphrase: ${this.catchPhrase}</div>
                            <div>bs: ${this.bs}</div>
                        </div>
                        <div class="details__btn">
                            <button class="details__btn-back">Back</button>
                            <button class="details__btn-post">post of current user</button>
                        </div>
                    </div>
                </div>
            `;
            this.parentElement.appendChild(elementUser);
        }
    }

    class PostConstructor {
        constructor(src, alt, id, title, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.id = id;
            this.title = title;
            this.parentElement = document.querySelector(parentSelector);
        }

        render() {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML += `
                <div class="post__icon">
                    <img src="${this.src}" alt="${this.alt}" />
                </div>
                <div class="post__title">
                    Post ${this.id} Headline
                </div>
                <div class="post__desc">
                    ${this.title}...
                </div>
                <button class="post__btn" date-id = ${this.id}>Read More</button>
            `;

            this.parentElement.appendChild(postElement);
        }
    }

    const postDetailsCards = async (url, parentSelector) => {
        // Створюємо модальне вікно для завантаження
        const modal = document.createElement('div');
        const modalInfo = document.createElement('div');
        const parentElement = document.querySelector(parentSelector);

        try {
            modal.classList.add('modal');
            modalInfo.innerText = 'Loading...';

            modal.appendChild(modalInfo);
            parentElement.appendChild(modal);

            // Отримуємо дані з сервера
            const data = await getData(url);

            // Показуємо заголовок, якщо є дані
            if (data.length > 0) {
                document.querySelector('.posts__title').style.display = 'block';
            }

            // Перебираємо дані та рендеримо карточки
            data.forEach(({ id, title }) => {
                new PostConstructor('./icons/email.svg', 'post', id, title, '.posts__row').render();
            });
        } catch (error) {
            modalInfo.innerText = 'Something went wrong'; // Виводимо помилку в модальне вікно
        } finally {
            // Прибираємо модальне вікно після завершення операцій
            setTimeout(() => {
                modal.remove();
            }, 100);
        }
    };

    // Отримання ID користувача з параметрів URL
    let userId = new URL(location.href).searchParams.get('id');

    // Формування URL для отримання даних про користувача та його пости
    const urlGetUser = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const urlGetPosts = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

    // Функція для рендерингу даних про користувача та його пости
    const userDetailsCards = async (parentSelector) => {
        // Створення модального вікна для відображення процесу завантаження
        const modal = document.createElement('div');
        const modalInfo = document.createElement('div');
        const parentElement = document.querySelector(parentSelector);
        const postsRow = document.querySelector('.posts__row');

        // Заборона прокрутки сторінки під час завантаження даних
        document.body.style.overflow = 'hidden';

        try {
            // Додавання класів та тексту до модального вікна
            modal.classList.add('modal');
            modalInfo.innerText = 'Loading...';

            // Додавання тексту процесу завантаження до модального вікна
            modal.appendChild(modalInfo);
            parentElement.appendChild(modal);

            // Отримання та рендеринг даних про користувача
            const userData = await getData(urlGetUser);
            new UsersDebitis(userData, photoArray[+userId - 1], userData.name, parentSelector).render();

            // Ініціалізація вкладок для подальшого використання
            tabs('.detalis__nav', '.detalis__link', '.detalis__address', 'detalis__link-active');

            // Отримання кнопок "Назад" та "Деталі постів"
            const btnBack = document.querySelector('.details__btn-back');
            const btnPost = document.querySelector('.details__btn-post');

            // Обробник кліку на кнопці "Назад"
            btnBack.addEventListener('click', () => location.href = 'index.html');

            // Обробник кліку на кнопці "Деталі постів"
            btnPost.addEventListener('click', () => postDetailsCards(urlGetPosts, '.posts__row'), { once: true });

            // Обробник кліку на кнопці посту
            postsRow.addEventListener('click', (event) => {
                const target = event.target;
                if (target && target.classList.contains('post__btn')) {
                    const postId = target.getAttribute('date-id');
                    console.log(postId);
                    location.href = `post-details.html?id=${postId}`;
                }
            });

        } catch (error) {
            console.error('Error:', error);
            modalInfo.innerText = 'Something went wrong';
        } finally {
            // Зняття заборони прокрутки та видалення модального вікна після завантаження
            setTimeout(() => {
                document.body.style.overflow = '';
                modal.remove();
            }, 100);
        }
    };

    userDetailsCards('.details');
});
