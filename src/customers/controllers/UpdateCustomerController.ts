import { Request, Response } from 'express';
import { Customer } from '../models/Customer';

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; 
  const { name, dateOfBirth, cpf, email, phone } = req.body;

  try {
    
    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    
    const checkCpf = await Customer.findOne({
        where: { cpf }
      });
      if (checkCpf) {
        res.status(400).json({ message: 'A customer with this CPF already exists' });
        return
      };
  
      const checkEmail = await Customer.findOne({
        where: { email }
      });
      if (checkEmail) {
        res.status(400).json({ message: 'A customer with this email already exists' });
        return
      };

    await customer.update({
      name: name || customer.name,
      dateOfBirth: dateOfBirth || customer.dateOfBirth,
      cpf: cpf || customer.cpf,
      email: email || customer.email,
      phone: phone || customer.phone,
    });

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating customer', error });
  }
};
