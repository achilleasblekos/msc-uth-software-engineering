//import java.util.Arrays;

public class StringUpper {
    public static void main(String[] args) {
        String[] words = {"apple", "banana", "orange", "pineapple", "pear","tangerine","kiwi",
                            "grapefruit", "grape", "cherry"};

        System.out.println("Array before conversion:");
        for(int i = 0; i < words.length; i++){
            System.out.print(words[i] + " ");
        }
//        System.out.println(Arrays.toString(words));
        for(int i = 0; i < words.length; i++) {
            words[i] = words[i].toUpperCase();
        }

        System.out.println();
        System.out.println("Array after conversion:");
        for (String word : words) {
            System.out.print(word + " ");
        }
//        System.out.println(Arrays.toString(words));
    }
}
