const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryAll = await Category.findAll();
    res.status(200).json(categoryAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categorySingle = await Category.findByPk(req.params.id, {});

    if (!categorySingle) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }

    res.status(200).json(categorySingle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryNew = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      category_name: req.body.category_name,
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryUpdate);
    if (!categoryUpdate) {
      res.status(404).json({ message: `Can not locate ID` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryDelete = await Category.destroy({
      category_name: req.body.category_name,
      where: {
        id: req.params.id,
      },
    });

    if (!categoryDelete) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
