public class SalariedEmployee extends Employee {
    private int salary;
    public SalariedEmployee() {
        super();
        this.salary = 0;
    }
    public SalariedEmployee(String name, String taxCode, int salary) {
        super(name, taxCode);
        this.salary = salary;
    }
    public int getSalary() {
        return salary;
    }
    public void setSalary(int salary) {
        this.salary = salary;
    }
    @Override
    public int payment(){
        return salary;
    }
    @Override
    public String toString() {
        return super.toString() + " payment " + payment();
    }
}
