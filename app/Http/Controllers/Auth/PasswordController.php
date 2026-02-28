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
        // $validated = $request->validate([
        //     'current_password' => ['required', 'current_password'],
        //     'password' => ['required', Password::defaults(), 'confirmed'],
        // ]);
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()    // must contain letters
                    ->numbers()    // must contain numbers
                    ->symbols()    // must contain special characters
                    ->mixedCase(), // optional: requires both uppercase & lowercase letters
            ],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
