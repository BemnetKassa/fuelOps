import prisma from '../config/prisma.js';


export const getSystemReport = async (req, res, next) => {
try {
const totalUsers = await prisma.user.count();
const totalStations = await prisma.station.count();
const totalTransactions = await prisma.fuelTransaction.count();
const totalFuelDispensed = await prisma.fuelTransaction.aggregate({ _sum: { liters: true } });


res.json({
totalUsers,
totalStations,
totalTransactions,
totalFuelDispensed: totalFuelDispensed._sum.liters || 0,
});
} catch (err) {
next(err);
}
};