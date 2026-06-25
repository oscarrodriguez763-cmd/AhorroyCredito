import { Router } from 'express';
import prisma from '../prisma';
import { authRequired, adminOnly, AuthRequest } from '../middlewares/auth';
import { addMonths } from 'date-fns';

const router = Router();

router.post('/request', authRequired, async (req: AuthRequest, res) => {
  const { requestedAmount, termMonths, annualRatePercent, method } = req.body;
  if (!requestedAmount || !termMonths || !annualRatePercent)
    return res.status(400).json({ error: 'missing fields' });

  const loan = await prisma.loan.create({
    data: {
      userId: req.user!.userId,
      requestedAmount,
      termMonths,
      annualRatePercent,
      method: method || 'FRENCH',
      state: 'REQUESTED'
    }
  });

  res.json(loan);
});

// Admin approves loan -> creates schedule (French amortization)
router.post('/:id/approve', authRequired, adminOnly, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { approvedAmount } = req.body;
  const loan = await prisma.loan.findUnique({ where: { id } });
  if (!loan) return res.status(404).json({ error: 'loan not found' });

  const approved = approvedAmount ?? loan.requestedAmount;
  const monthlyRate = (loan.annualRatePercent / 100) / 12;
  const n = loan.termMonths;

  // cuota francesa (cuota fija)
  const factor = monthlyRate === 0 ? 1 : (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const installment = Number((Number(approved) * factor).toFixed(2));

  let remaining = Number(approved);
  const schedules = [];
  for (let i = 1; i <= n; i++) {
    const interest = Number((remaining * monthlyRate).toFixed(2));
    const principal = Number((installment - interest).toFixed(2));
    remaining = Number((remaining - principal).toFixed(2));
    const dueDate = addMonths(new Date(), i);
    schedules.push({
      installmentNo: i,
      dueDate,
      principal,
      interest,
      remaining: remaining > 0 ? remaining : 0
    });
  }

  const result = await prisma.$transaction([
    prisma.loan.update({
      where: { id },
      data: { approvedAmount: approved, state: 'APPROVED', approvedAt: new Date() }
    }),
    prisma.loanSchedule.createMany({
      data: schedules.map(s => ({ ...s, loanId: id }))
    })
  ]);

  res.json({ ok: true, schedulesCount: schedules.length });
});

// List loans for user or admin
router.get('/', authRequired, async (req: AuthRequest, res) => {
  if (req.user!.role === 'ADMIN') {
    const loans = await prisma.loan.findMany({ include: { schedules: true, payments: true } });
    return res.json(loans);
  }
  const loans = await prisma.loan.findMany({
    where: { userId: req.user!.userId },
    include: { schedules: true, payments: true }
  });
  res.json(loans);
});

export default router;
