public class SortArray {
    public static void main(String[] args) {
        int[] numbers = {34, 7, 23, 32, 5, 62, 78, 1, 45, 10};
        System.out.println("Array before sorting:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();
        bubbleSort(numbers);

        System.out.println("Array after sorting:");
        for (int number : numbers) {
            System.out.print(number + " ");
        }
    }

    private static void bubbleSort(int[] numbers) {
        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] > numbers[j]) {
                    int temp = numbers[i];
                    numbers[i] = numbers[j];
                    numbers[j] = temp;
                }
            }
        }
    }


}
