import { Card } from "../models/Card.js";
import { successResponse, errorResponse } from '../utils/responseUtils';

export async function getCards(req, res){
    try{
        const cards = await Card.find({owner: req.user._id})
      .populate('owner', '_id name avatar')
      .lean();
         //.populate('likes'); // And this too
         console.log("Cards found:", cards); 
    return successResponse(res, {
      cards
    });

  } catch(error) {
    return errorResponse(res, 'Error getting cards', 500, error);
  }
}

export async function createCard(req, res){
    try{
        const {title, link} = req.body;
         if (!title || !link) {
            return errorResponse(res, 'Title and link are required', 400);
        }

      const newCard = await Card.create({
      title,
      link,
      owner: req.user._id
    });
    return successResponse(res, {
      card: newCard
    }, 201);
    }
    catch(error){
    return errorResponse(res, 'Error creating card', 500, error);
  }
}

export async function deleteCard(req, res){
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
}

export async function likeCard(req, res){
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

export async function dislikeCard(req, res){
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