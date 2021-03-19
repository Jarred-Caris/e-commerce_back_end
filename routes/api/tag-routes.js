const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!singleTag) {
      res.status(404).json({ message: "No id found!" });
      return;
    }

    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagNew = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      // category_name: req.body.category_name,
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagUpdate);
    if (!tagUpdate) {
      res.status(404).json({ message: `Can not locate ID` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async  (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDelete) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
