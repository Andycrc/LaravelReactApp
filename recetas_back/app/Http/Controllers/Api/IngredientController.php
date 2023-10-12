<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ingredients = Ingredient::all();
        return $ingredients;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Código para crear el ingrediente
            $ingredient = new Ingredient();
            $ingredient->recipe_id = $request->recipe_id;
            $ingredient->ingredient_name = $request->ingredient_name;
            $ingredient->quantity = $request->quantity;
            $ingredient->save();
        
            return response()->json(['message' => 'Ingrediente creado con éxito'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el ingrediente'], 500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ingredient = Ingredient::find($id);
        return $ingredient;
    }
    
    public function filterByRecipe(Request $request, $recipeId)
    {
        try {
            $ingredients = Ingredient::select('ingredient_name', 'quantity')
                ->join('recipes', 'ingredients.recipe_id', '=', 'recipes.id')
                ->where('ingredients.recipe_id', $recipeId)
                ->get();

            return response()->json($ingredients, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al filtrar ingredientes por receta'], 500);
        }
    }
 
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->recipe_id = $request->recipe_id;
        $ingredient->ingredient_name = $request->ingredient_name;
        $ingredient->quantity = $request->quantity;

        $ingredient->save();
        return $ingredient;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ingredient = Ingredient::destroy($id);
        return $ingredient;
    }
}
