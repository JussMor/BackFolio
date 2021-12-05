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

const updateTecnologyById = async (req, res) => {

    const { nombre, description,tipo } = req.body
    const { id } = req.params
    
    if(!id) {
        return res.status(400).send({
            message: "id content can not be empty"
        });
    }
    Tecnologia.findByIdAndUpdate(id,{
        nombre: nombre,
        description: description,
        tipo: tipo
    },{new:true}, () =>{
        res.send('Tecnología con id: '+ req.params.id+' actualizada')})
        .catch((err) => {
        res.status(500).send({
            message:
            err.message ||
            "Algun error ocurrio mientras se actualizaba la tecnologia.",
            });
        });
};

const deleteTecnologyById = async (req, res) => {
    
    Tecnologia.findByIdAndRemove(req.params.id).then(()=>{
        res.send({message:'Tecnologia eliminada'})
    }).catch(err=>{
        res.send({message:'Error al eliminar la tecnología'})
    })
};

module.exports = {
  getAllTecnology,
  createTecnology,
  updateTecnologyById,
  deleteTecnologyById,
};
