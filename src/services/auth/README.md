# Auth Service

Этот модуль хранит состояние авторизации в `effector` и синхронизирует токен с браузерным storage через `effector-storage`.

## Что здесь есть

- `$authToken` — текущий access token в памяти приложения.
- `$refreshToken` — текущий refresh token в памяти приложения.
- `$rememberMe` — флаг "запомнить меня".
- `$isCheckingAuth` — признак фоновой проверки авторизации.
- `setAuthToken` — вручную обновляет access token.
- `setRefreshToken` — вручную обновляет refresh token.
- `setRememberMe` — переключает режим хранения токенов.
- `handleLogout` — очищает auth-состояние.
- `AuthGate` — gate приложения, который держится рядом с auth-модулем.

## Как работает storage

Используются два отдельных хранилища:

- `localStorage` — если пользователь выбрал "запомнить меня".
- `sessionStorage` — если пользователь не выбрал этот чекбокс.

Для этого есть технические store:

- `$localStorageAuthToken`
- `$sessionStorageAuthToken`
- `$localStorageRefreshToken`
- `$sessionStorageRefreshToken`

Они синхронизируются с браузерным storage через `persist` из:

- `effector-storage/local`
- `effector-storage/session`

Ключи хранения:

- `auth-token`
- `refresh-token`

## Как происходит восстановление токена

При старте `persist(...)` читает значение из storage и кладет его в технический store.

Дальше:

- если пара токенов пришла из `sessionStorage`, вызывается `hydrateAuth({ authToken, refreshToken, rememberMe: false })`
- если пара токенов пришла из `localStorage`, вызывается `hydrateAuth({ authToken, refreshToken, rememberMe: true })`

`hydrateAuth` обновляет:

- `$authToken`
- `$refreshToken`
- `$rememberMe`

То есть основное auth-состояние всегда живет в обычных store приложения, а storage используется только как источник/приемник данных.

## Как происходит запись токена

Когда меняется:

- `setAuthToken`
- `setRefreshToken`
- `setRememberMe`

срабатывает `sample`, который формирует payload для `syncStorage`.

`syncStorage` раскладывает токены так:

- в `localStorage`, если `$rememberMe === true`
- в `sessionStorage`, если `$rememberMe === false`

Второе хранилище при этом очищается, чтобы не было двух активных токенов одновременно.

## Проверка авторизации

После `hydrateAuth` запускается `checkAuthFx`.

Это нужно, чтобы после перезагрузки приложения не просто доверять токенам из storage, а проверить access token на сервере.

## Refresh token

`auth.service` также настраивает API-клиент через `configureAuthClient(...)`.

Когда API отвечает `401`:

- клиент берет текущий `refreshToken`
- вызывает `refreshAuthFx`
- обновляет `$authToken` и `$refreshToken`
- повторяет исходный запрос

Если refresh не удался, вызывается `handleLogout`.

## Почему сделано именно так

Такой подход разделяет ответственность:

- `$authToken`, `$refreshToken` и `$rememberMe` — бизнес-состояние
- технические storage-store — инфраструктурный слой для persistence

За счет этого UI и остальные модули работают только с основными auth-store и не зависят напрямую от того, где именно лежат токены.
