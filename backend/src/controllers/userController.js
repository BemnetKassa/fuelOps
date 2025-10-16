import prisma from '../config/prisma.js';


export const getAllUsers = async (req, res, next) => {
try {
const users = await prisma.user.findMany({ include: { vehicle: true } });
res.json(users);
} catch (err) {
next(err);
}
};


export const createUser = async (req, res, next) => {
try {
const { name, phone, role } = req.body;
const user = await prisma.user.create({ data: { name, phone, role } });
res.status(201).json(user);
} catch (err) {
next(err);
}
};