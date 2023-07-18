import  {Request, Response} from "express";


class CartController {

    // create new item
    addItem = async (req: Request, res: Response) => {
        //data to be saved in database

    }


    // get all
    getCart = async (req: Request, res: Response) => {
    }


    // get one
    removeItem = async (req: Request, res: Response) => {
    }

    //update item
    checkout = async (req: Request, res: Response) => {
    }
}

export const cartController = new CartController()
