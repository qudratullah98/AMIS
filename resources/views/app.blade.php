<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'د ټرانسپورټي وسائطو د احصایې او عوائدو سیستم') }}</title>
    <link rel="icon" type="image/png" href="/images/logo.jpeg">

    <!-- Fonts -->
    {{-- <link rel="preconnect" href="https://fonts.bunny.net"> --}}
    {{-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> --}}

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<style>
    @font-face {
        font-family: 'Bahij';
        src: url('fonts/Bahij_Nazanin-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'Calibri', sans-serif !important;
    }
</style>

<body className="font-sans antialiased" dir="rtl">
    @inertia
</body>

</html>
