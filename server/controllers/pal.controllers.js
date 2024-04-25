import Pals from "../models/pal.models.js";

//add 1 pal
async function addPal(req, res) {
  try {
    const pal = await Pals.create(req.body);
    // 201 for successful posts requests
    return res.status(201).json(pal);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//find all pals
async function getAllPals(req, res) {
  try {
    const allPals = await Pals.find();
    // 200 for successful get req
    return res.status(200).json(allPals);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//find 1 pal by id
async function getPalById(req, res) {
  try {
    const id = req.params.id;
    const pal = await Pals.findById(id);
    return res.status(200).json(pal);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//find pal by color
async function getPalsByColor(req, res) {
  try {
    const color = req.params.color;
    const pals = await Pals.find({ color: color });
    return res.status(200).json(pals);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//find 1 pal by name
async function getPalByName(req, res) {
  try {
    const name = req.params.name;
    const pals = await Pals.find({ name: name });
    return res.status(200).json(pals);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//find 1 pal by type
async function getPalsByType(req, res) {
  try {
    const type = req.params.type;
    const pals = await Pals.find({ type: type });
    return res.status(200).json(pals);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//update
async function updatePalById(req, res) {
  try {
    const id = req.params.id;
    const updatedPal = await Pals.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(updatedPal);
  } catch (err) {
    return res.status(500).json(err);
  }
}

//delete
async function deletePalById(req, res) {
  try {
    const id = req.params.id;
    await Pals.deleteOne({ _id: id });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
}
export {
  addPal,
  getAllPals,
  getPalById,
  updatePalById,
  deletePalById,
  getPalsByColor,
  getPalByName,
  getPalsByType,
};
