import React, { useState } from 'react';

const FizzBuzz = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const numberPattern = /^\d+$/; // Giltigt nummer tex 123
  const rangePattern = /^\d+-\d+$/; //Giltig range är tex 1-5

  const handleSubmit = () => {
    const parsedInput = validateInput(input);

    if (parsedInput === null) {
      setResult("Invalid input");
      return;
    }
    if (typeof parsedInput === "number") {
      setResult(fizzBuzz(parsedInput));
    } else {
      const [start, end] = parsedInput;
      const range = rangeOfNumbers(start, end);
      const fizzBuzzResults = range.map(fizzBuzz).join(", ");
      setResult(fizzBuzzResults);
    }
  };

  const fizzBuzz = (number: number) => {
    if (number % 3 === 0 && number % 5 === 0) {
      return "FizzBuzz";
    } else if (number % 3 === 0) {
      return "Fizz";
    } else if (number % 5 === 0) {
      return "Buzz";
    } else {
      return number.toString();
    }
  };

  const rangeOfNumbers = (a: number, b: number) => [...Array(b + 1).keys()].slice(a);

  const validateInput = (input: string): number | [number, number] | null => {
    if (input.includes("-")) {
      if(rangePattern.test(input)){
        const [start, end] = input.split("-").map(Number);
        if (isNaN(start) || isNaN(end) || start > end) {
          return null;
        }
        return [start, end];
      }
    } else {
      if(numberPattern.test(input)){
        const number = parseInt(input, 10);
        if (isNaN(number) || number < 0) {
          return null;
        }
        return number;
      }
    }
    return null //input matchade inte pattern
  };

  return (
    <div>
      <p>Enter a number or range (e.g., 1-5)</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a number or range (e.g., 1-5)"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>{result}</div>
    </div>
  );
};

export default FizzBuzz;
