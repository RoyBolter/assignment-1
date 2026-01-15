import { Request, Response } from 'express';
import fibonacci from "./fib";

// Define the shape of the path parameters
interface RouteParams {
  num: string;
}

export default (req: Request<RouteParams>, res: Response): void | Response => {
  // Access the number from the URL path (e.g., /fib/8)
  const { num } = req.params; 

  // 1. Validation: num will be a string because of the route definition
  const parsedNum = parseInt(num, 10);

  if (isNaN(parsedNum)) {
    return res.status(400).send("Please provide a valid number in the URL path.");
  }

  // 2. Calculation
  const fibN: number = fibonacci(parsedNum);

  // 3. Logic Handling
  if (fibN < 0) {
    return res.send(`fibonacci(${parsedNum}) is undefined`);
  }

  return res.send(`fibonacci(${parsedNum}) is ${fibN}`);
};
