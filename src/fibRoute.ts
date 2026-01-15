// Endpoint for querying the fibonacci numbers
import fibonacci from "./fib";

export default (req, res) => {
  // Use req.query for URL parameters like ?num=5
  // Use req.params if your route is defined as /fibonacci/:num
  const { num } = req.query; 

  // 1. Validation: Ensure num exists and is a valid integer
  const parsedNum = parseInt(num, 10);

  if (isNaN(parsedNum)) {
    return res.status(400).send("Please provide a valid number.");
  }

  // 2. Calculation
  const fibN = fibonacci(parsedNum);

  // 3. Logic Handling
  // If your fibonacci function returns -1 or null for negative inputs
  if (fibN === null || fibN < 0) {
    return res.send(`fibonacci(${parsedNum}) is undefined`);
  }

  res.send(`fibonacci(${parsedNum}) is ${fibN}`);
};
