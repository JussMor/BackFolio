//Tools are a crud with mongoDB
const Tecnologia = require("../../../../db/mongo/models/Tecnologia");

const getAllTecnology = async (req, res) => {
  Tecnologia.find()
    .then((tecnologia) => {
      res.send(tecnologia);
    })
    .catch((err) => {
      res.send(err);
    });
};

const createTecnology = async (req, res) => {
  try {
    const { nombre, description,tipo } = req.body

    if(!description) {
        return res.status(400).send({
            message: "categoria content can not be empty"
        });
    }
    const tecnology = new Tecnologia({
      nombre: nombre,
      description: description,
      tipo: tipo,
    });

    await tecnology
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Algun error ocurrio mientras se creaba la categoria.",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const updateTecnologyById = async () => {};

const deleteTecnologyById = async () => {};

module.exports = {
  getAllTecnology,
  createTecnology,
  updateTecnologyById,
  deleteTecnologyById,
};
