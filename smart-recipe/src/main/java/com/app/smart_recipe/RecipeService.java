package com.app.smart_recipe;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RecipeService {

    private final ChatModel chatModel;

    public RecipeService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createRecipe(String ingredients,
                               String cuisine,
                               String dietaryRestrictions) {

        String template = """
                Create a recipe using these ingredients: {ingredients}.
                Cuisine preference: {cuisine}.
                Dietary restrictions: {dietaryRestrictions}.
                Provide:
                - Recipe title
                - Ingredients list
                - Step-by-step cooking instructions
                """;

        PromptTemplate promptTemplate = new PromptTemplate(template);

        Prompt prompt = promptTemplate.create(Map.of(
                "ingredients", ingredients,
                "cuisine", cuisine,
                "dietaryRestrictions", dietaryRestrictions
        ));

        ChatResponse response = chatModel.call(prompt);

        return response.getResult().getOutput().getText();
    }
}
