const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const categoryAll = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const categorySingle = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categorySingle) {
      res.status(404).json({ message: "No id found!" });
      return;
    }

    res.status(200).json(categorySingle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
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

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      // category_name: req.body.category_name,
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      //  category_name: req.body.category_name,
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
