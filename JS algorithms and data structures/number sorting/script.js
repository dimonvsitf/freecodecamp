const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  event.preventDefault();

  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  updateUI(sortedValues);
}

const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

/*bubble sort 
Repeatedly swaps adjacent elements if they are in the wrong order.

Pros:
•	Very simple to implement.
•	Adaptive (early exit if no swaps are needed).

Cons:
•	Slow for large datasets.
•	Performs a lot of unnecessary swaps
*/
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

/*
Selection Sort
•	How It Works: Finds the minimum element in each pass and places it at the beginning.

Pros:
•	Very simple to implement.
•	Always does exactly N - 1 swaps.

Cons:
•	Not adaptive (no early exit).
•	Always O(N²), even if the array is nearly sorted.
*/

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
}

/*
Insertion Sort
•	How It Works: Builds a sorted section of the array one element at a time by shifting larger elements to the right.
Pros:
•	Very efficient for small or nearly sorted arrays.
•	Stable and adaptive.
Cons:
•	Still O(N²) in the worst case (completely reversed arrays).
*/

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
}

sortButton.addEventListener("click", sortInputArray);