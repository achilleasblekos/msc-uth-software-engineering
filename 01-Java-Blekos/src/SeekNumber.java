public class SeekNumber {
    public static void main(String[] args) {
        int[] numbers = {1, 5, 7, 10, 23, 32, 34, 45, 62, 78};
        int searchFor = 62;

        int index = binarySearch(numbers, searchFor);
        if (index != -1) {
            System.out.println("Element " + searchFor + " found at index " + index);
        } else {
            System.out.println("Element " + searchFor + " not found!");
        }
    }
    public static int binarySearch(int[] array, int target) {
        int left = 0;
        int right = array.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (array[mid] == target) {
                return mid;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
