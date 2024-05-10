import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
  // can be improved
  const recipies = JSON.parse(recipeJSON);
  switch (req.body.choice) {
    case "chicken":
      let chickenRecipe = recipies[0];
      console.log(chickenRecipe.ingredients.toppings);
      res.render("index.ejs", {
        recipeName: chickenRecipe.name,
        protein: chickenRecipe.ingredients.protein,
        salsa: chickenRecipe.ingredients.salsa,
        toppings: chickenRecipe.ingredients.toppings,
      });

    case "beef":
      let beefRecipe = recipies[1];
      res.render("index.ejs", {
        recipeName: beefRecipe.name,
        protein: beefRecipe.ingredients.protein,
        salsa: beefRecipe.ingredients.salsa,
        toppings: beefRecipe.ingredients.toppings,
      });

    case "fish":
      let fishRecipe = recipies[2];
      res.render("index.ejs", {
        recipeName: fishRecipe.name,
        protein: fishRecipe.ingredients.protein,
        salsa: fishRecipe.ingredients.salsa,
        toppings: fishRecipe.ingredients.toppings,
      });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
