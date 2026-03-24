# Auth Service

Этот модуль хранит состояние авторизации в `effector` и синхронизирует токен с браузерным storage через `effector-storage`.

## Что здесь есть

- `$authToken` — текущий токен в памяти приложения.
- `$rememberMe` — флаг "запомнить меня".
- `$isCheckingAuth` — признак фоновой проверки авторизации.
- `setAuthToken` — вручную обновляет токен.
- `setRememberMe` — переключает режим хранения токена.
- `AuthGate` — триггерит проверку авторизации при входе в приложение.

## Как работает storage

Используются два отдельных хранилища:

- `localStorage` — если пользователь выбрал "запомнить меня".
- `sessionStorage` — если пользователь не выбрал этот чекбокс.

Для этого есть два технических store:

- `$localStorageAuthToken`
- `$sessionStorageAuthToken`

Они синхронизируются с браузерным storage через `persist` из:

- `effector-storage/local`
- `effector-storage/session`

Ключ хранения: `auth-token`.

## Как происходит восстановление токена

При старте `persist(...)` читает значение из storage и кладет его в технический store.

Дальше:

- если токен пришел из `sessionStorage`, вызывается `hydrateAuth({ authToken, rememberMe: false })`
- если токен пришел из `localStorage`, вызывается `hydrateAuth({ authToken, rememberMe: true })`

`hydrateAuth` обновляет:

- `$authToken`
- `$rememberMe`

То есть основное auth-состояние всегда живет в обычных store приложения, а storage используется только как источник/приемник данных.

## Как происходит запись токена

Когда меняется:

- `setAuthToken`
- `setRememberMe`

срабатывает `sample`, который формирует payload для `syncStorage`.

`syncStorage` раскладывает токен так:

- в `localStorage`, если `$rememberMe === true`
- в `sessionStorage`, если `$rememberMe === false`

Второе хранилище при этом очищается, чтобы не было двух активных токенов одновременно.

## Проверка авторизации

Когда открывается `AuthGate`, если в `$authToken` уже есть значение, запускается `checkAuthFx`.

Это нужно, чтобы после перезагрузки приложения не просто доверять токену из storage, а проверить его на сервере.

## Почему сделано именно так

Такой подход разделяет ответственность:

- `$authToken` и `$rememberMe` — бизнес-состояние
- `$localStorageAuthToken` и `$sessionStorageAuthToken` — инфраструктурные store для persistence

За счет этого UI и остальные модули работают только с основными auth-store и не зависят напрямую от того, где именно лежит токен.
