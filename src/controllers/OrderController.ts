import { Router, Response, Request } from 'express';
import { Order } from '../models/Order';
import { OrderReturnType, OrderType } from '../interfaces/Order';
import { authToken } from '../middlewares/auth';

export const OrderController: Router = Router();
const order: Order = new Order();

OrderController.get(
  '/:user_id',
  authToken,
  async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.user_id);
    const currentOrder: OrderReturnType[] = await order.getOrders(userId);
    return res.json(currentOrder);
  }
);
OrderController.get(
  '/current/:user_id',
  authToken,
  async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.user_id);
    const currentOrder: OrderReturnType = await order.getCurrentOrderByUserId(
      userId
    );
    return res.json(currentOrder);
  }
);

OrderController.post('/', authToken, async (req: Request, res: Response) => {
  const newOrder: OrderType = await order.createOrder(req.body);
  return res.json(newOrder);
});