import { Request, Response } from "express";
import { Car } from "../../models/Cars/Car";
import { Item } from "../../models/Cars/Item";

export const deleteCarById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { carId } = req.params;

    try {
        const item = await Item.destroy({
            where: { carId },
        });

        if (!item) {
            res.status(404).json({ message: "Car not found" });
            return;
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "Error fetching car", error });
    }
};
