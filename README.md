# Infoshop
Пример магазина для размещения инфопродуктов. Демо:https://nodeserver-ueultojffl.now.sh/
```bash
Запуск проекта: npm start
```
# Routers

```bash
/: project pages. Страница проектов.
/:id: project card. Карточка проекта.
/add_commentary/:id. Commentary form. Форма для добавления комментария.
/add_commentary/:id. Add commentary.  Пост-запрос для добавления комментария. 
/category/:categoryParam. Find project. Пост-запрос для поиска проектов по категориям. 
/about. About project. Информация о проекте.
/login. Login form. Авторизация пользователям.
/register. Register form.  Регистрация пользователя.
/logout. Logout form. Завершение сеанса пользователя.
```
# Api.

```bash
1. Зарегистрироваться на сайте. Ввести логин и пароль.

2. Получить токен. Сделать пост-запрос на api/token. C объектом в теле запроса:
{name:'имя пользователя', password:'пароль пользователя'}.

3. Сохранить токен. Далее для методов  отправлять post-запрос с заголовком.
POST /api/projects HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer полученныйтокен
Cache-Control: no-cache

4. Всего доступы два метода api:
  1.Получение списка проектов. api/projects
  2.Получение списка пользователей. api/users
```
# Tests
  Для запуска тестов необходимо переключиться на ветку test.
```bash
  Запуск тестов для api проекта: npm run test:api.
  Запуск тестов для middlewares проекта: npm run test:middleware.

```



