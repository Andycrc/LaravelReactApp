<?php

use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\PreparationController;
use App\Http\Controllers\Api\RecipeController;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Define las rutas manualmente para RecipeController
Route::get('/recipes', [RecipeController::class, 'index']);
Route::post('/recipe', [RecipeController::class, 'store']);
Route::get('/recipe/{id}', [RecipeController::class, 'show']);
Route::put('/recipe/{id}', [RecipeController::class, 'update']);
Route::delete('/recipe/{id}', [RecipeController::class, 'destroy']);


Route::get('/ingredients', [IngredientController::class, 'index']);
Route::post('/ingredient', [IngredientController::class, 'store']);
Route::get('/ingredient/{id}', [IngredientController::class, 'show']);
Route::put('/ingredient/{id}', [IngredientController::class, 'update']);
Route::delete('/ingredient/{id}', [IngredientController::class, 'destroy']);

Route::get('/ingredients/filter/{recipeId}', [IngredientController::class, 'filterByRecipe']);



Route::get('/preparations', [PreparationController::class, 'index']);
Route::post('/preparation', [PreparationController::class, 'store']);
Route::get('/preparation/{id}', [PreparationController::class, 'show']);
Route::put('/preparation/{id}', [PreparationController::class, 'update']);
Route::delete('/preparation/{id}', [PreparationController::class, 'destroy']);