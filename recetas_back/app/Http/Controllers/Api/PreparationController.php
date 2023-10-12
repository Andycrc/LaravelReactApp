<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Preparation;
use Illuminate\Http\Request;

class PreparationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preparations = Preparation::all();
        return $preparations;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $preparation = new Preparation();
        $preparation->recipe_id = $request->recipe_id;
        $preparation->step = $request->step;
        $preparation->step_description = $request->step_description;

        $preparation->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $preparation = Preparation::find($id);
        return $preparation;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $preparation = Preparation::findOrFail($id);
        $preparation->recipe_id = $request->recipe_id;
        $preparation->step = $request->step;
        $preparation->step_description = $request->step_description;

        $preparation->save();
        return $preparation;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $preparation = Preparation::destroy($id);
        return $preparation;
    }
}
