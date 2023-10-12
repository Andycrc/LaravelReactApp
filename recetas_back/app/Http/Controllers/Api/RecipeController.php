<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class RecipeController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recipes = Recipe::all();
        return $recipes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'recipe_name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Asegúrate de ajustar las reglas de validación según tus necesidades
        ]);

        $image = $request->file('image');
        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('images'), $imageName);

        $recipe = new Recipe([
            'recipe_name' => $request->get('recipe_name'),
            'description' => $request->get('description'),
            'image' => 'images/' . $imageName, // Ruta relativa a la carpeta public
        ]);
        $recipe->save();

        return response()->json(['message' => 'Receta creada con éxito'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $recipe = Recipe::find($id);
        return $recipe;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Buscar la receta por su ID
        $recipe = Recipe::findOrFail($id);
    
        // Validar los datos del formulario
        $request->validate([
            'recibe_name' => 'required|string',
            'description' => 'required|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Puedes ajustar las reglas según tus necesidades
        ]);
    
        // Actualizar los campos de la receta
        $recipe->recibe_name = $request->input('recibe_name');
        $recipe->description = $request->input('description');
    
        // Verificar si se envió una nueva imagen
        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior si existe
            if (file_exists(public_path($recipe->image))) {
                unlink(public_path($recipe->image));
            }
    
            // Guardar la nueva imagen
            $image = $request->file('image');
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('images'), $imageName);
            $recipe->image = 'images/' . $imageName;
        }
    
        // Guardar los cambios en la base de datos
        $recipe->save();
    
        return response()->json(['message' => 'Receta actualizada con éxito'], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $recipe = Recipe::destroy($id);
        return $recipe;
    }
}
