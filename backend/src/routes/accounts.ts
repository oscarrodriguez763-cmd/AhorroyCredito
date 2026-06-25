import { Router } from 'express';
import prisma from '../prisma';
import { authRequired, AuthRequest } from '../middlewares/auth';
import { Decimal } from '@prisma/client/runtime';

const router = Router();

router.use(authRequired);

// create account
router.post('/', async (req: AuthRequest, res) => {
  const { type, currency } = req.body;
  if (!type) return res.status(400).json({ error: 'type required' });
  const account = await prisma.account.create({
    data: {
      userId: req.user!.userId,
      type,
      currency: currency || 'USD',
      balance: new Decimal(0)
    }
  });
  res.json(account);
});

// get accounts
router.get('/', async (req: AuthRequest, res) => {
  const accounts = await prisma.account.findMany({
    where: { userId: req.user!.userId },
    include: { transactions: true }
  });
  res.json(accounts);
});

// deposit
router.post('/:id/deposit', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  if (!amount) return res.status(400).json({ error: 'amount required' });

  const acc = await prisma.account.findUnique({ where: { id } });
  if (!acc) return res.status(404).json({ error: 'account not found' });
  if (acc.userId !== req.user!.userId) return res.status(403).json({ error: 'forbidden' });

  // transaction + balance update in a transaction
  const result = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        accountId: id,
        type: 'DEPOSIT',
        amount,
        description
      }
    }),
    prisma.account.update({
      where: { id },
      data: { balance: { increment: amount } }
    })
  ]);
  res.json(result);
});

// withdraw
router.post('/:id/withdraw', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  if (!amount) return res.status(400).json({ error: 'amount required' });

  const acc = await prisma.account.findUnique({ where: { id } });
  if (!acc) return res.status(404).json({ error: 'account not found' });
  if (acc.userId !== req.user!.userId) return res.status(403).json({ error: 'forbidden' });

  if (acc.balance < amount) return res.status(400).json({ error: 'insufficient funds' });

  const result = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        accountId: id,
        type: 'WITHDRAW',
        amount,
        description
      }
    }),
    prisma.account.update({
      where: { id },
      data: { balance: { decrement: amount } }
    })
  ]);
  res.json(result);
});

export default router;
