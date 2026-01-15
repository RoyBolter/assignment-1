import { Request, Response } from 'express';
import fibonacci from "./fib";

// Define an interface for the query parameters to avoid 'any'
interface FibQuery {
  num?: string;
}

export default (req: Request<unknown, unknown, unknown, FibQuery>, res: Response): void | Response => {
  // Now 'num' is typed as 'string | undefined' instead of 'any'
  const { num } = req.query; 

  // 1. Validation: Ensure 'num' is a string and not empty
  if (typeof num !== 'string') {
    return res.status(400).send("Please provide a 'num' query parameter.");
  }

  const parsedNum = parseInt(num, 10);

  if (isNaN(parsedNum)) {
    return res.status(400).send("Please provide a valid number.");
  }

  // 2. Calculation
  const fibN: number = fibonacci(parsedNum);

  // 3. Logic Handling
  if (fibN < 0) {
    return res.send(`fibonacci(${parsedNum}) is undefined`);
  }

  return res.send(`fibonacci(${parsedNum}) is ${fibN}`);
};
