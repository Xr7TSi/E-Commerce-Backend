const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll().catch((err) => {
    res.json(err);
  });
  res.json(allCategories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const selectedCategory = await Category.findOne({
      where: { category_id: req.params.id },
      include: {
        model: Product,
        attributes: [
          "product_id",
          "product_name",
          "price",
          "stock",
          "category_id",
        ],
      },
    });
    if (!selectedCategory) {
      res.status(404).json({ message: "Category does not exist" });
      return;
    }
    res.status(200).json(selectedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  /* put should look like this...
    {
      "category_id": 6,
      "category_name": "Jeans",
    }
  */
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
    /* put should look like this...
    {
      "category_id": "6",
      "category_name": "Mom_Jeans",
    }
  */

  
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        category_id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: "Category not updated." });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    });
    if (!categoryDelete) {
      res.status(404).json({ message: "Category not deleted" });
      return;
    }
    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
