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
        $users  = User::with(['roles:id,name',
            'userTypes:id,user_id,user_type,terminal_id,province_id,bander_id',
            'userTypes.terminal:id,terminal_name',
            'userTypes.province:id,province',
            'userTypes.company:id,company_name',
            'userTypes.bander:id,bandar_name',
        ])->search($search)->latest()->paginate($perPage);



        // Add `details` column to each user
        $users->getCollection()->transform(function ($user) {
            $type = $user->userTypes;

            if ($type) {
                switch ($type->user_type) {
                    case 'Transport_user':
                        $user->details = $type->terminal ? ' T - ' . $type->terminal->terminal_name : null;
                        break;
                    case 'Report_user':
                        $user->details = $type->province ? ' P - ' . $type->province->province : null;
                        break;
                    case 'Company_user':
                        $user->details = $type->company ? ' C - ' . $type->company->company_name : null;
                        break;
                    case 'Bander_user':
                        $user->details = $type->bander ? ' B - ' . $type->bander->bandar_name : null;
                        break;
                    case 'genral_user':
                        $user->details = $type->province ? ' P - ' . $type->province->province : null;
                        break;
                    default:
                        $user->details = null;
                }
            } else {
                $user->details = null;
            }

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
        $user       = User::with('userTypes')->find($id);
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
        $userType = $request->user_type;
        // Default all to null
        $userTypeData = [
            'user_type'   => $userType,
            'province_id' => null,
            'terminal_id' => null,
            'bander_id'   => null,
            'company_id'  => null,
        ];

        // Assign specific ID based on user type
        if ($userType === 'Admin') {
            $userTypeData['province_id'] = $request->province_id;
            $userTypeData['terminal_id'] = $request->terminal_id;
            $userTypeData['bander_id']   = $request->bander_id;
            $userTypeData['company_id']  = $request->company_id;
        } elseif ($userType === 'Report_user' || $userType === 'genral_user') {
            $userTypeData['province_id'] = $request->province_id ?? null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = null;
        } elseif ($userType === 'Transport_user') {
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = $request->terminal_id ?? null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = null;
        } elseif ($userType === 'Bander_user') {
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = $request->bander_id ?? null;
            $userTypeData['company_id']  = null;
        } elseif ($userType === 'Company_user') {
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = $request->company_id ?? null;
        } else {
            // Optional fallback if user_type is unknown
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = null;
        }

        // Update or create userTypes
        if ($user->userTypes) {
            $user->userTypes->update($userTypeData);
        } else {
            $user->userTypes()->create($userTypeData);
        }

        // Update role
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

        // Handle user type-specific fields
        $userType = $request->user_type;

        // Default all to null
        $userTypeData = [
            'user_type'   => $userType,
            'province_id' => null,
            'terminal_id' => null,
            'bander_id'   => null,
            'company_id'  => null,
        ];

        // Assign specific ID based on user type
        if ($userType === 'Admin') {
            $userTypeData['province_id'] = $request->province_id;
            $userTypeData['terminal_id'] = $request->terminal_id;
            $userTypeData['bander_id']   = $request->bander_id;
            $userTypeData['company_id']  = $request->company_id;
        } elseif ($userType === 'Report_user' || $userType === 'genral_user') {
            $userTypeData['province_id'] = $request->province_id ?? null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = null;
        } elseif ($userType === 'Transport_user') {
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = $request->terminal_id ?? null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = null;
        } elseif ($userType === 'Bander_user') {
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = $request->bander_id ?? null;
            $userTypeData['company_id']  = null;
        } elseif ($userType === 'Company_user') {
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = $request->company_id ?? null;
        } else {
            // Optional fallback if user_type is unknown
            $userTypeData['province_id'] = null;
            $userTypeData['terminal_id'] = null;
            $userTypeData['bander_id']   = null;
            $userTypeData['company_id']  = null;
        }

        // Update or create userTypes
        if ($user->userTypes) {
            $user->userTypes->update($userTypeData);
        } else {
            $user->userTypes()->create($userTypeData);
        }

        // Update role
        $user->syncRoles([$request->role_id]);

        return redirect()->route('user.index')->with('success', 'User updated successfully');
    }
}
