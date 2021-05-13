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

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return Tag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((currentTags) => {
      // get list of current tag_ids
      const productTagIds = currentTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !currentTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
