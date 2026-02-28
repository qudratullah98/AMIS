<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(){
        $search = request()->input('query');
        $perPage = request()->input('perPage', 10);
        // $roles = Role::with('permissions')->search($search)->latest()->paginate(10);
        $roles = Role::with('permissions')->latest()->paginate($perPage);
        return Inertia::render('Role/Index', [
            'roles' => $roles
        ]);
    }


    public function create(){
        $permission = Permission::select("id","name")->get();
        return Inertia::render('Role/Create',[
            'permission' => $permission
        ]);
    }


    public function store(StoreRoleRequest $request)
    {
        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions); // Use syncPermissions to attach and detach
        return redirect()->route('role.index');
    }
    public function update(StoreRoleRequest $request)
        {
            $role = Role::find($request->roleId);
            if (!$role) {
                return redirect()->route('role.index')->withErrors(['error' => 'Role not found']);
            }
            $role->name = $request->name;
            $role->save();
            $role->syncPermissions($request->permissions); // Use syncPermissions to attach and detach
            return redirect()->route('role.index');
        }
        public function Edit($roleId){
            $role = Role::findOrFail($roleId);
            $permissions = Permission::select("id","name")->get();
            $rolePermissions = $role->permissions->pluck('id')->toArray();
            return Inertia::render('Role/Edit', [
                'role' => $role,
                'permission' => $permissions,
                'rolePermissions' => $rolePermissions
            ]);

        }
}
