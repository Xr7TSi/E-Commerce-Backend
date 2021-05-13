const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// router.get('/', async (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
//   try {
//     const tag = await Tag.findAll({
//       include: [{ model: tag }, { model: product }, { model: category}, {model: product_tag}],
//     });
//     res.status(200).json(tag);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  // find all tags
  //   // be sure to include its associated Product data
  const tags = await Tag.findAll({
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
  }).catch((err) => {
    res.json(err);
  });
  res.json(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const id = await Tag.findOne({
      where: { tag_id: req.params.id },
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
    res.status(200).json(id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      "tag_id": 11,
      "tag_name": "House Music"
    }
  */
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  // put should look like this:
  // {
  // "tag_id": 2,
  // "tag_name": "Country_music"
  // }
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        tag_id: req.params.id,
      },
    });
    if (!updateTag[0]) {
      res.status(404).json({ message: "Tag not updated." });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });
    if (!tagDelete) {
      res.status(404).json({ message: "Tag not deleted" });
      return;
    }
    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
