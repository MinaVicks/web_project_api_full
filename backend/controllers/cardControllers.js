import { Card } from "../models/Card.js";
import { successResponse } from "../utils/ResponseUtils.js";

import { 
  BadRequestError, 
  ForbiddenError, 
  NotFoundError 
} from '../utils/errorUtils.js';

export async function getCards(req, res, next){
    try{
        const cards = await Card.find({owner: req.user._id})
      .populate('owner', '_id name avatar')
      .lean();
        
    console.log("Cards found:", cards); 
    return successResponse(res, {
      cards
    });

  } catch (err) {
    next(err);
    }
};

export async function createCard(req, res, next){
    try{
        const {title, link} = req.body;
         if (!title || !link) {
            throw new BadRequestError('Nombre y enlace son requeridos');
        }

      const newCard = await Card.create({
      title,
      link,
      owner: req.user._id
    });
    return successResponse(res, {
      card: newCard
    }, 201);
    } catch (err) {
    next(err);
    }

};

export async function deleteCard(req, res, next){
     try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await Card.findById(cardId).orFail(() => {
      throw new NotFoundError('Tarjeta no encontrada');
    });

    if (card.owner.toString() !== userId) {
      throw new ForbiddenError();
    }

    await Card.findByIdAndDelete(cardId);
    res.json({ message: "Tarjeta eliminada" });

  } catch (err) {
    next(err);
  }

};

export async function likeCard( req, res, next){
    try{
     const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.json(card);
    }
      catch (err) {
        next(err);
     }
};

export async function dislikeCard(req, res, next){
    try{
    const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true }
  );
  res.json(card);
    } catch (err) {
    next(err);
  }
};