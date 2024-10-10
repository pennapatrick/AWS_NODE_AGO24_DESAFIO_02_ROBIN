import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const createUser = (req: Request, res: Response): void => {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400).json({ message: "Complete name required." });
    return;
  }
  if (!email) {
    res.status(400).json({ message: "email is required." });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "Password is required." });
    return;
  }
  User.findOne({ where: { email, deletedAt: null } })
    .then((existingUser) => {
      if (existingUser) {
        return Promise.reject({
          status: 400,
          message: "Email already exists",
        });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashePassword) => {
      return User.create({
        name,
        email,
        password: hashePassword,
        createdAt: new Date(),
        deletedAt: null,
      });
    })
    .then((newUser) => {
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else
        res.status(500).json({ message: "Error creating new user", error });
    });
};

export const updateUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  User.findOne({ where: { id, deletedAt: null } })
    .then(async (existingUser) => {
      if (!existingUser) {
        return Promise.reject({ status: 404, message: "User not found" });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updates: any = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.password = hashedPassword;
        return await existingUser.update(updates);
      }

      return existingUser.update(updates);
    })
    .then((updatedUser) => {
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({
          message: "Error updating user",
          error,
        });
      }
    });
};

export const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;

  User.findOne({ where: { id, deletedAt: null } })
    .then((existingUser) => {
      if (!existingUser) {
        return Promise.reject({ status: 404, message: "User not found" });
      }
      return existingUser.update({ deletedAt: new Date() });
    })
    .then(() => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error at deleting user", error });
      }
    });
};
