# TelegramSelenium

Это программа нужна для автоматического ответа на приходящие сообщения в телеграме

## Настройка среды

Для ее запуска необходимо установить [node.js](https://nodejs.org/en/download/), [git](https://gitforwindows.org/) и [VS Code](https://code.visualstudio.com/)

После установки нужно зайти в VS Code и нажать "ctrl + j", должна открытся командная строка, в ней пишем команды (по очереди):

```
node -v
npm -v
```

В ответе должны быть номера версий, примерно так:

```
node -v
v20.9.0

npm -v
10.1.0
```

После этого в VS Code нажимаем "ctrl + k + o" и создаем папку для этой программы где удобно и выбыраем ее, после этого заходим в консоль("ctrl+j") и прописываем команду:

```
git clone https://github.com/Loborifma/telegramSelenium.git
```

К вам должна скопироваться программа

После ее копирования нужно в консоли прописать:

```
npm i
```

Все программа настроена, можно запускать

## Запуск программы и изменение параметров

Для запуска нужно ввыести в консоль

```
npm start
```

И авторизироваться в веб версии телеграмма

Для того чтобы поменять тригерные слова, чат или количество минут между ответами, нужно зайти в файл index.js, там соответсвтенно поменять переменные:

```
//URL чата
const url = "https://web.telegram.org/a/#-1002021751367";
//Тригерные слова
const triggerWords = /(Отдам|Who wants)/gi;
//Промежуток между ответами в минутах
const delayBetweenAnswerInMinutes = 1;
```
