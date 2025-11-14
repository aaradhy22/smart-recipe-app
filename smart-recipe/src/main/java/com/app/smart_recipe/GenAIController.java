package com.app.smart_recipe;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GenAIController {

    private final RecipeService recipeService;

    public GenAIController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipe-creator")
    public String recipeCreator(
            @RequestParam String ingredients,
            @RequestParam(defaultValue = "any") String cuisine,
            @RequestParam(defaultValue = "") String dietaryRestrictions // FIXED name
    ) {
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
    }
}
