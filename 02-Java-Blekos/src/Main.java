import java.util.ArrayList;
import java.util.List;
public class Main {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new SalariedEmployee("Achilleas", "1234456789", 2000));
        employees.add(new HourlyEmployee("Nikos","987654321", 14,160));
        for (Employee employee : employees) {
            System.out.println(employee);
        }
    }
}