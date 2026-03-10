<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function layout()
    {
        return Inertia::render('User/Layout');
    }

    public function index()
    {
        $search = request()->input('query');
        $perPage = request()->input('perPage', 10);
        $users  = User::with(['roles:id,name'])->search($search)->latest()->paginate($perPage);



        // Add `details` column to each user
        $users->getCollection()->transform(function ($user) {
           

            return $user;
        });

        return Inertia::render('User/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $roles = Role::get();
        return Inertia::render('User/Create', [
            'roles' => $roles,
        ]);
    }
    public function Edit($id)
    {
        $roles      = Role::get();
        $user       = User::find($id);
        $user_roles = $user->getRoleNames();
        return Inertia::render('User/Edit', [
            'roles'      => $roles,
            'user'       => $user,
            'user_roles' => $user_roles,
        ]);
    }
    public function store(StoreUserRequest $request)
    {

        $user     = User::create($request->validated()); 
        $user->syncRoles([$request->role_id]);

        return redirect()->route('user.index')->with('success', 'User Create Successfully');
    }
    public function update(StoreUserRequest $request)
    {
        $user = User::findOrFail($request->id);

        // Update user base data (name, email, password if provided)
        $user->update([
            'name'  => $request->name,
            'email' => $request->email,
            ...(filled($request->password) ? ['password' => bcrypt($request->password)] : []),
        ]);

      

        // Update role
        $user->syncRoles([$request->role_id]);

        return redirect()->route('user.index')->with('success', 'User updated successfully');
    }
}
