const { Card } = require("../models/Card.js");

exports.getCards = async (req, res) =>{
    try{
        const cards = await Card.find({owner: req.user.id}).populate("owner likes");
        
        if (!cards || cards.length === 0) {
        return res
        .status(404)
        .json({ message: "No hay tarjetas en la base de datos" });
        }
        res.json(cards);
    }
    catch(error){
        res.status(500).json({message:"Error al obtener cartas",
        error: error.message
    });
    }
};

exports.createCard = async (req, res) =>{
    try{
        const {title, link} = req.body;
         if (!title || !link) {
            return res.status(400).json({ message: "Campo requerido" });
        }
         const newCard = await Card.create({
      title,
      link,
      owner: req.user._id,
      likes: [],
    });
    res.status(201).json(newCard);
        // await newCard.save();
    }
    catch(error){
    res.status(500).json({ 
      message: "Error creating card",
      error: error.message 
    });
  }
}

exports.deleteCard = async (req, res) =>{
     try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await Card.findById(cardId).orFail(
      new Error("No se ha encontrado ninguna tarjeta con esa id")
    );

    await Card.findByIdAndDelete(cardId);
    res.json({ message: "Tarjeta eliminada" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Id Invalido" });
    }
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  }
};

exports.likeCard = async (req, res) =>{
    try{
     const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.json(card);
    }
    catch(err){
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
}

exports.dislikeCard = async (req, res) =>{
    try{
    const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true }
  );
  res.json(card);
    }
    catch(err){
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
}