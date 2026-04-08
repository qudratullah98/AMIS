<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->mixedCase(),
            ],
        ], [
            // Current password
            'current_password.required'         => "passwordIsNeeded",
            'current_password.current_password' => "passwordInvalid",

            // Basic password
            'password.required'                 => "passwordIsNeeded",
            'password.confirmed'                => "confirmPasswordInvalid",
            'password.min'                      => "passwordMin", // for min(8)

            // 🔥 Advanced password rules
            'password.letters'                  => "passwordLetters",
            'password.mixed'                    => "passwordMixedCase",
            'password.numbers'                  => "passwordNumbers",
            'password.symbols'                  => "passwordSymbols",
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
